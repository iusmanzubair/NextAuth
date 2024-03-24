import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Welcome to authentication world with next js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={GeistSans.className}>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                error: "bg-destructive/15 text-destructive border-none",
                success: "bg-emerald-500/15 text-emerald-500 border-none",
              },
            }}
          />
        </body>
      </html>
    </SessionProvider>
  );
}
