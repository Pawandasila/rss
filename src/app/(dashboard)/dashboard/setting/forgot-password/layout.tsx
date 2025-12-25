import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password - Rashtriya Seva Sangh",
  description: "Reset your password securely",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}