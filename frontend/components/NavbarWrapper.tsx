"use client";
import { usePathname } from "next/navigation";
import NavbarMenu from "@/components/ui/navbar-menu";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isSignupPage = pathname === "/signup";
  const isLoginPage = pathname === "/login";
  const showNavbar = !isSignupPage && !isLoginPage;

  if (!showNavbar) return null;

  return <NavbarMenu />;
}
