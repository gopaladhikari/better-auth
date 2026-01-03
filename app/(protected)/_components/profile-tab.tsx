"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@/hooks/useForm";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

export function ProfileTab() {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  const { handleSubmit, isLoading, error } = useForm();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const promises = [
      authClient.updateUser({
        username: data.username as string,
        displayUsername: data.displayUsername as string,
      }),
    ];

    const newEmail = data.email as string;

    if (session?.user.email !== newEmail)
      promises.push(
        authClient.changeEmail({
          newEmail,
        })
      );

    const results = await Promise.all(promises);

    const updateUserResult = results[0];

    const changeEmailResult = results[1] ?? {
      error: false,
    };

    if (updateUserResult.error)
      addToast({
        title: "Error updating profile",
        description: updateUserResult.error.message,
        color: "danger",
      });
    else if (changeEmailResult.error)
      addToast({
        title: "Error updating email",
        description: changeEmailResult.error.message,
        color: "danger",
      });
    else {
      addToast({
        title: "Profile updated",
        description: "Your profile has been updated.",
        color: "success",
      });
      console.log({ newEmail });
      router.refresh();
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center my-12">
      <div className="rounded-large bg-content1 shadow-small flex w-full max-w-sm flex-col gap-4 px-8 pt-6 pb-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-large font-medium">
            Update your profile
          </h1>
          <p className="text-small text-default-500">
            Update your profile details.
          </p>
        </div>

        <Form
          className="flex flex-col gap-3"
          validationBehavior="native"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          key={
            session?.user.displayUsername ||
            session?.user.username ||
            session?.user.email
          }
        >
          <Input
            isRequired
            label="Name"
            labelPlacement="outside"
            name="displayUsername"
            placeholder="Enter your name"
            type="text"
            variant="bordered"
            defaultValue={session?.user.displayUsername || ""}
          />

          <Input
            isRequired
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your name"
            type="text"
            variant="bordered"
            defaultValue={session?.user.username || ""}
          />

          <Input
            isRequired
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            defaultValue={session?.user.email}
          />

          {error && (
            <p className="text-small text-danger">{error.message}</p>
          )}

          <Button
            color="primary"
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </Form>
      </div>
    </div>
  );
}
