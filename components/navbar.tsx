"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { authClient } from "@/lib/auth-client";

export function Menu() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <Navbar>
        <NavbarBrand>
          <div className="flex items-center">
            <span className="mr-2">Better Auth</span>
            <span className="animate-spin h-4 w-4 border-t-2 border-b-2 border-r-2 border-gray-400 rounded-full"></span>
          </div>
        </NavbarBrand>
      </Navbar>
    );
  }

  if (data?.user) {
    return (
      <Navbar>
        <NavbarBrand>
          <Link className="text-2xl font-bold" href="/">
            {" "}
            Better Auth
          </Link>
        </NavbarBrand>

        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="danger"
              onPress={async () => await authClient.signOut()}
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }

  return (
    <Navbar>
      <NavbarBrand>
        <Link className="text-2xl font-bold" href="/">
          {" "}
          Better Auth
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
