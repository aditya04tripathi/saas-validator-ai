# Startup Validator SaaS

## Overview

The Startup Validator SaaS is an AI-powered platform designed to help entrepreneurs validate their business ideas, generate comprehensive project plans, and manage execution through interactive workflows. By leveraging Groq's Large Language Model (LLM) capabilities, the system provides detailed market analysis, feasibility checks, and actionable feedback.

This project integrates validation tools, project planning, and task management into a single, cohesive interface.

## Key Features

- **AI-Powered Validation**: Instant analysis of startup ideas with scoring, SWOT analysis, and market insights.
- **Automated Project Planning**: Generation of phased execution plans (MVP, Launch, etc.) with cost and time estimates.
- **Interactive Flowcharts**: Visual representation of project phases and dependencies using `xyflow`.
- **SCRUM Boards**: Built-in task management boards for tracking progress (TODO, In Progress, Done).
- **Secure Authentication**: Robust user management via NextAuth.js.
- **Subscription Management**: Different access tiers (Free, Monthly, Yearly, Lifetime).

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI, MagicUI, Tailark
- **Database**: MongoDB (via Mongoose)
- **Authentication**: NextAuth.js v5 (Beta)
- **AI Provider**: Groq SDK
- **Visualization**: @xyflow/react
- **Package Manager**: pnpm

## Architecture Overview

The application follows a modular architecture to ensure scalability and maintainability:

- **`app/`**: Next.js App Router entry points and pages.
- **`modules/`**: Feature-based modules containing domain logic, components, and types (e.g., `auth`, `validation`, `project`).
- **`components/ui/`**: Reusable low-level UI components (Shadcn).
- **`lib/`**: Shared utilities and configurations (DB connection, AI clients).
- **`models/`**: Mongoose schema definitions for database entities.
- **`actions/`**: Server Actions for handling mutations and business logic securely.

## Setup and Installation

### Prerequisites

- Node.js 18+
- pnpm
- MongoDB Instance (Local or Atlas)
- Groq API Key

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd saas-help-ai
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory:

   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret
   MONGODB_URI=mongodb://localhost:27017/startup-validator
   GROQ_API_KEY=your-groq-api-key
   ```

4. **Run Development Server**
   ```bash
   pnpm dev
   ```

## Usage

- Open `http://localhost:3000` to view the landing page.
- **Sign Up** to create an account.
- Navigate to **"Validate"** to submit a startup idea.
- View the generated **Validation Report** and **Project Plan**.
- Use the **Dashboard** to manage saved projects and tasks.

## Configuration

Configuration is primarily handled through environment variables and the `next.config.ts` file.

- **Tailwind**: Configured in `globals.css` (v4 CSS-first config).
- **Database**: Connection settings in `lib/db.ts`.

## Deployment

The application is optimized for deployment on platforms supporting Next.js Server Actions:

- **Vercel**: Recommended for seamless integration.
- **Railway**: Suitable for full-stack deployment with MongoDB.

Ensure all environment variables (`NEXTAUTH_SECRET`, `MONGODB_URI`, `GROQ_API_KEY`) are set in the production environment.

## Limitations and Assumptions

- AI analysis depends on the availability and limits of the Groq API.
- The free tier has restricted usage limits on validations.
- Flowchart state is currently persisted per project plan.

## Documentation

- [Software Requirements Specification](./SRS.md)

## License

This project is licensed under the terms described in [LICENSE](./LICENSE).
