"use client";
import { usePathname } from "next/navigation";
import NavbarWrapper from "@/components/NavbarWrapper";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isSignupPage = pathname === "/signup";
  const isLoginPage = pathname === "/login";
  const showPadding = !isSignupPage && !isLoginPage;

  return (
    <>
      {/* Navbar visible on all pages except signup and login */}
      <NavbarWrapper />
      <main className={showPadding ? "pt-24" : ""}>{children}</main>
    </>
  );
}
