import type { Metadata } from "next";
import { Providers } from "./providers";
import { Menu } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Auth",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <Menu />
          {children}
        </Providers>
      </body>
    </html>
  );
}
