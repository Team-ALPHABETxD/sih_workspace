"use client";

import { usePathname } from "next/navigation";
import NavbarWrapper from "@/components/NavbarWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // special pages
  const isSignupPage = pathname === "/signup";
  const isLoginPage = pathname === "/login";
  const isDashboard = pathname?.startsWith("/dashboard"); // detect dashboard routes

  const showNavbar = !isSignupPage && !isLoginPage && !isDashboard;
  const showPadding = !isSignupPage && !isLoginPage && !isDashboard;

  return (
    <>
      {/* Navbar hidden on signup, login, and dashboard */}
      {showNavbar && <NavbarWrapper />}
      {/* Remove top padding on signup, login, and dashboard */}
      <main className={showPadding ? "pt-24" : ""}>{children}</main>
    </>
  );
}
