"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

export function User() {
  const { data, isPending } = authClient.useSession();

  if (isPending)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex h-full w-full items-center justify-center">
      {data?.user ? (
        <div>
          <h1>Hello {data.user.name}</h1>
          <p>Your email is {data.user.email}</p>

          <Button
            color="danger"
            onPress={async () => await authClient.signOut()}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div>
          <h1>No user session</h1>
        </div>
      )}
    </div>
  );
}
