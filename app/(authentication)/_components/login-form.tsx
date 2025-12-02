"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Link } from "@heroui/link";
import { Form } from "@heroui/form";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useToggle } from "@/hooks/useToggle";
import { useForm } from "@/hooks/useForm";

export function LoginForm() {
  const [isVisible, setIsVisible] = useToggle();
  const { isLoading, handleSubmit, error, dispatch } = useForm();

  const router = useRouter();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    const form = event.currentTarget;

    const rememberMe = typeof formData.remember === "string";

    return await authClient.signIn.email(
      {
        email: formData.email as string,
        password: formData.password as string,
        rememberMe,
      },
      {
        onSuccess() {
          form.reset();
          router.push("/");
        },
        onError(context) {
          dispatch({
            type: "REJECTED",
            payload: context.error,
          });
        },
      }
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center my-12">
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">Sign in to your account</h1>
          <p className="text-small text-default-500">
            to continue to better-auth
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
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </Form>

        {error && <p className="text-small text-danger">{error.message}</p>}

        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Continue with Github
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
