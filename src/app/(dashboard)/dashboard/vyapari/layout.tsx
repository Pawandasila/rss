import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vyapari Management | RSS Dashboard",
  description: "Manage business directory categories, subcategories, and listings",
};

export default function VyapariLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
