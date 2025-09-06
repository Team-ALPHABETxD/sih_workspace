import type { Metadata } from "next";
import "./globals.css";
import NavbarMenu from "@/components/ui/navbar-menu";

export const metadata: Metadata = {
  title: "Metal Craft",
  description: "Heavy Metal Pollution Indices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        {/* Navbar visible on all pages */}
        <NavbarMenu />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
