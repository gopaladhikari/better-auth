"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { Divider } from "@heroui/divider";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@/hooks/useForm";
import { addToast } from "@heroui/react";

export function ForgotPasswordForm() {
  const { isLoading, handleSubmit, error } = useForm();

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    const { data, error } = await authClient.requestPasswordReset(
      {
        email: formData.email as string,
        redirectTo: "/reset-password",
      },
      {
        onSuccess({ data }) {
          addToast({
            title: "Password reset email sent",
            description: data?.message,
            color: "success",
            variant: "solid",
          });
        },
      }
    );

    if (error) throw error;

    return data;
  };

  return (
    <div className="flex h-full w-full items-center justify-center my-12">
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Forgot password</h1>
          <p className="text-small text-default-500">
            to send forgot password email to your inbox
          </p>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />

          <div className="flex w-full items-center justify-end px-1 py-2">
            <Link
              className="text-default-500"
              href="/login"
              size="sm"
            >
              Login
            </Link>
          </div>
          {error && (
            <p className="text-small text-danger">{error.message}</p>
          )}
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </Form>

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>

        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="/signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
