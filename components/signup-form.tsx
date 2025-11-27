"use client";

import React from "react";
import { Button, Input, Checkbox, Link, addToast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email as string,
        password: formData.password as string,
        name: formData.username as string,
        username: formData.username as string,
        callbackURL: "/dashboard",
      });

      if (error) throw error;

      console.log(data);
    } catch (error) {
      setError(error as Error);
      addToast({
        title: "Sign Up Failed",
        description: (error as Error).message,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <p className="pb-4 text-left text-3xl font-semibold">
          Sign Up
          <span aria-label="emoji" className="ml-2" role="img">
            👋
          </span>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
              <button type="button" onClick={toggleVisibility}>
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
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
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
            <Link className="relative z-1" href="/privacy-policy" size="sm">
              Privacy Policy
            </Link>
          </Checkbox>
          <Button color="primary" type="submit" isLoading={isLoading}>
            Sign Up
          </Button>
          {error && (
            <p className="text-small text-center text-danger">
              {error.message}
            </p>
          )}
        </form>
        <p className="text-small text-center">
          <Link href="#" size="sm">
            Already have an account? Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
