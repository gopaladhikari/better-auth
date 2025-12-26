"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { Divider } from "@heroui/divider";
import { authClient } from "@/lib/auth-client";
import { Icon } from "@iconify/react";
import { useToggle } from "@/hooks/useToggle";
import { useForm } from "@/hooks/useForm";
import { addToast } from "@heroui/react";

export function SignUpForm() {
  const { error, isLoading, handleSubmit, data } = useForm();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const errors: string[] = [];

  if (password.length < 4)
    errors.push("Password must be 4 characters or more.");

  if ((password.match(/[A-Z]/g) || []).length < 1)
    errors.push("Password must include at least 1 upper case letter");

  if ((password.match(/[^a-z]/gi) || []).length < 1)
    errors.push("Password must include at least 1 symbol.");

  const [isVisible, setIsVisible] = useToggle();

  const [isConfirmVisible, setIsConfirmVisible] = useToggle();

  const googleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    const { data, error } = await authClient.signUp.email({
      email: formData.email as string,
      password: formData.password as string,
      name: formData.username as string,
      username: formData.username as string,
    });

    if (error) throw error;

    addToast({
      title: "Verification email sent",
      description:
        "Please check your inbox and confirm your email address to complete the sign up process.",
      color: "success",
    });

    return data;
  };

  return (
    <div className="flex h-full w-full items-center justify-center my-12">
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">
            Sign up to your account
          </h1>
          <p className="text-small text-default-500">
            to create a new account with better-auth.
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
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="text"
            variant="bordered"
          />
          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={setIsVisible}>
                {isVisible ? (
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
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            onPaste={(e) => e.preventDefault()}
            variant="bordered"
            value={password}
            onValueChange={setPassword}
            onCopy={(e) => e.preventDefault()}
            errorMessage={() => (
              <ul>
                {errors?.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            )}
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={setIsConfirmVisible}>
                {isConfirmVisible ? (
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
            labelPlacement="outside"
            name="confirmPassword"
            placeholder="Confirm your password"
            type={isConfirmVisible ? "text" : "password"}
            variant="bordered"
            onPaste={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            validate={(value) => {
              if (value !== password) return "Passwords do not match";
            }}
          />
          <Checkbox isRequired className="py-4" size="sm">
            I agree with the&nbsp;
            <Link
              className="relative z-1"
              href="/terms-and-conditions"
              size="sm"
            >
              Terms
            </Link>
            &nbsp; and&nbsp;
            <Link
              className="relative z-1"
              href="/privacy-policy"
              size="sm"
            >
              Privacy Policy
            </Link>
          </Checkbox>

          {error && (
            <p className="text-small text-danger">{error.message}</p>
          )}
          {data && typeof data === "object" && "user" in data ? (
            <p className="text-sm text-success">
              Verfication email has been sent to your email{" "}
            </p>
          ) : null}

          <Button
            color="primary"
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={
              <Icon icon="flat-color-icons:google" width={24} />
            }
            variant="bordered"
            onPress={googleSignUp}
          >
            Continue with Google
          </Button>
        </div>
        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="#" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
