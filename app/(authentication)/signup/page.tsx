import type { Metadata } from "next";
import { SignUpForm } from "../_components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Signup to better auth",
};

export default function Page() {
  return <SignUpForm />;
}
