import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policies - Rashtriya Seva Sangh",
  description:
    "Read our Privacy Policy, Refund Policy, and Terms & Conditions. Learn how we protect your data and handle donations at Rashtriya Seva Sangh.",
  keywords: [
    "privacy policy",
    "refund policy",
    "terms and conditions",
    "rashtriya seva sangh policies",
    "data protection",
    "donation policy",
  ],
  openGraph: {
    title: "Policies - Rashtriya Seva Sangh",
    description:
      "Read our Privacy Policy, Refund Policy, and Terms & Conditions.",
    url: "http://joinrss.org.in/policies",
    siteName: "Rashtriya Seva Sangh",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Policies - Rashtriya Seva Sangh",
    description:
      "Read our Privacy Policy, Refund Policy, and Terms & Conditions.",
  },
};

export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
