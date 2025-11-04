import type { Metadata } from "next";
import { Suspense } from "react";
import LoginWrapper from "@/modules/auth/components/login-wrapper";
import { METADATA } from "@/modules/shared/constants";

export const metadata: Metadata = METADATA.pages.signIn;

export default function SignInPage() {
  return (
    <Suspense>
      <LoginWrapper />
    </Suspense>
  );
}
