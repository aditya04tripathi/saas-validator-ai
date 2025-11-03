import { Redis } from "ioredis";

const getRedisClient = () => {
  if (!process.env.REDIS_URL || process.env.REDIS_URL === "/") {
    return null;
  }

  try {
    const client = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      retryStrategy: () => null, // Don't retry on connection failure
      lazyConnect: true, // Don't connect immediately
      // Connection timeout
      connectTimeout: 10000,
      // Keep alive to detect connection issues
      keepAlive: 30000,
    });

    // Handle errors - log in development, silent in production
    client.on("error", (error) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Redis] Connection error:", error.message);
      }
    });

    client.on("connect", () => {
      if (process.env.NODE_ENV === "development") {
        console.log("[Redis] Connected successfully");
      }
    });

    // Attempt connection, but don't fail if it doesn't work
    client.connect().catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.warn("[Redis] Failed to connect:", error.message);
      }
    });

    return client;
  } catch (_error) {
    // Redis connection failed, return null to disable Redis features
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] Client creation failed");
    }
    return null;
  }
};

export const redis = getRedisClient();

/**
 * Check if Redis is available and ready for operations
 */
async function isRedisReady(): Promise<boolean> {
  if (!redis) return false;

  // Check connection status
  if (redis.status !== "ready" && redis.status !== "connect") {
    return false;
  }

  // Try to ping Redis to verify connection is actually working
  try {
    await redis.ping();
    return true;
  } catch {
    return false;
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (!(await isRedisReady()) || !redis) return null;
  try {
    const value = await redis.get(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] getCache error:", error);
    }
    return null;
  }
}

export async function setCache<T>(
  key: string,
  value: T,
  ttlSeconds?: number
): Promise<void> {
  if (!(await isRedisReady()) || !redis) return;
  try {
    const serialized = JSON.stringify(value);
    if (ttlSeconds) {
      await redis.setex(key, ttlSeconds, serialized);
    } else {
      await redis.set(key, serialized);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] setCache error:", error);
    }
  }
}

export async function deleteCache(key: string): Promise<void> {
  if (!(await isRedisReady()) || !redis) return;
  try {
    await redis.del(key);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] deleteCache error:", error);
    }
  }
}

/**
 * Rate limiting using Redis with atomic operations
 * Fixes race condition by using Lua script for atomic increment + expire
 */
export async function rateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  if (!(await isRedisReady())) {
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: new Date(Date.now() + windowMs),
    };
  }

  const key = `rate_limit:${identifier}`;
  const windowSeconds = Math.floor(windowMs / 1000);

  if (!redis) {
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: new Date(Date.now() + windowMs),
    };
  }

  try {
    // Use Lua script for atomic operation to prevent race conditions
    // This ensures incr and expire happen atomically
    const luaScript = `
      local current = redis.call('incr', KEYS[1])
      if current == 1 then
        redis.call('expire', KEYS[1], ARGV[1])
      end
      local ttl = redis.call('ttl', KEYS[1])
      return {current, ttl}
    `;

    const result = (await redis.eval(
      luaScript,
      1,
      key,
      windowSeconds.toString()
    )) as [number, number];

    const [current, ttl] = result;
    const resetAt = new Date(Date.now() + (ttl + 1) * 1000);

    return {
      allowed: current <= maxRequests,
      remaining: Math.max(0, maxRequests - current),
      resetAt,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Redis] rateLimit error:", error);
    }
    // Fallback to allowing the request if Redis fails
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: new Date(Date.now() + windowMs),
    };
  }
}
