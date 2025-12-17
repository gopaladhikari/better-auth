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
import { Icon } from "@iconify/react";
import { useToggle } from "@/hooks/useToggle";
import { useRouter, useSearchParams } from "next/navigation";

export function ResetPasswordForm() {
  const { isLoading, handleSubmit, error } = useForm();

  const searchParams = useSearchParams();
  const router = useRouter();

  const [passwordVisisble, setPasswordVisible] = useToggle();
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useToggle();

  const token = searchParams.get("token");
  const errorAuth = searchParams.get("error");

  if (!token || !errorAuth)
    return (
      <div className="flex h-full w-full items-center justify-center my-12">
        <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-large font-medium">
              Invalid reset link
            </h1>
          </div>

          <p className="text-small text-center">
            The password reset link is invalid or has expired.
          </p>

          <Link href="/login">Back to Login</Link>
        </div>
      </div>
    );

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    );

    if (formData.password !== formData.confirmPassword)
      throw new Error("Passwords do not match");

    const { data, error } = await authClient.resetPassword(
      {
        newPassword: formData.password as string,
        token: token as string,
      },
      {
        onSuccess({ data }) {
          addToast({
            title: "Password reset email sent",
            description: data?.message,
            color: "success",
            variant: "solid",
          });
          router.push("/login");
        },
      }
    );

    if (error) throw error;

    console.log(data);

    return data;
  };

  return (
    <div className="flex h-full w-full items-center justify-center my-12">
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Reset password</h1>
          <p className="text-small text-default-500">
            to reset your password with better-auth
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
            endContent={
              <button type="button" onClick={setPasswordVisible}>
                {passwordVisisble ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={passwordVisisble ? "text" : "password"}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button
                type="button"
                onClick={setConfirmPasswordVisible}
              >
                {confirmPasswordVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter your password"
            type={confirmPasswordVisible ? "text" : "password"}
            onCopy={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
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
