import type { Metadata } from "next";
import { Suspense } from "react";
import SignUpWrapper from "@/modules/auth/components/signup-wrapper";
import { METADATA } from "@/modules/shared/constants";

export const metadata: Metadata = METADATA.pages.signUp;

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpWrapper />
    </Suspense>
  );
}
