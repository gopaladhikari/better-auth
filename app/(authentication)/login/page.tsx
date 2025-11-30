import { LoginForm } from "../_components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to better auth",
};

export default function Page() {
  return <LoginForm />;
}
