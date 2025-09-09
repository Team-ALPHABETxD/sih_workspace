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
  const isGenerate = pathname?.startsWith("/generate"); // detect generate page
  const isProfile = pathname === "/profile";

  // hide navbar + padding on these routes
  const showNavbar = !isSignupPage && !isLoginPage && !isDashboard && !isGenerate && !isProfile;
  const showPadding = !isSignupPage && !isLoginPage && !isDashboard && !isGenerate && !isProfile;


  return (
    <>
      {/* Navbar hidden on signup, login, dashboard, and generate */}
      {showNavbar && <NavbarWrapper />}
      {/* Remove top padding on signup, login, dashboard, and generate */}
      <main className={showPadding ? "pt-24" : ""}>{children}</main>
    </>
  );
}
