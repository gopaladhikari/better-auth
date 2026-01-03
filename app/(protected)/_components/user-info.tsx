import { auth, type Session } from "@/lib/auth";
import { ArrowLeft, User } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export async function UserInfo() {
  const session = (await auth.api.getSession({
    headers: await headers(),
  })) as Session;

  return (
    <div className="mb-8">
      <Link href="/" className="inline-flex items-center mb-6">
        <ArrowLeft className="size-4 mr-2" />
        Back to Home
      </Link>
      <div className="flex items-center space-x-4">
        <div className="size-16 bg-muted rounded-full flex items-center justify-center overflow-hidden">
          {session.user.image ? (
            <Image
              width={64}
              height={64}
              src={session.user.image}
              alt="User Avatar"
              className="object-cover"
            />
          ) : (
            <User className="size-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-2xl font-semibold">
            {session.user.displayUsername}
          </p>
          <p className="text-muted-foreground text-sm">
            {session.user.email}
          </p>
        </div>
      </div>
    </div>
  );
}
