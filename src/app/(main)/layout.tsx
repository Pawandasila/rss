import React from "react";
import Header from "@/components/common/Navbar/Navbar";

import Footer from "@/components/common/Footer/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden relative">
      <Header />

      <main
        id="main-content"
        className="w-full font-hind"
        role="main"
        aria-label="Main content"
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
