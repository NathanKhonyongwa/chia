// NavbarShell.jsx (client component)
"use client";

import Navbar from "./Navbar/page";
import Footer from "./Footer";

export default function NavbarShell({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="pt-24 md:pt-28 flex-grow w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
}