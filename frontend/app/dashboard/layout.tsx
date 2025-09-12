"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-gray-700" />
    ),
  },
  {
    label: "Generate Report",
    href: "/dashboard/generate",
    icon: (
      <IconUserBolt className="h-5 w-5 shrink-0 text-gray-700" />
    ),
  },
  {
    label: "Recents",
    href: "/dashboard/recents",
    icon: (
      <IconUserBolt className="h-5 w-5 shrink-0 text-gray-700" />
    ),
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: (
      <IconSettings className="h-7 w-7 shrink-0 text-gray-700" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="h-5 w-5 shrink-0 text-gray-700" />
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden bg-white md:flex-row",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                if (link.label === "Logout") {
                  return (
                    <button
                      key={idx}
                      onClick={handleLogout}
                      className={cn(
                        "flex items-center justify-start gap-2 group/sidebar py-2 w-full text-left",
                        "text-gray-700 hover:text-gray-900 transition-colors"
                      )}
                    >
                      {link.icon}
                      <motion.span
                        animate={{
                          display: open ? "inline-block" : "none",
                          opacity: open ? 1 : 0,
                        }}
                        className="text-gray-700 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                      >
                        {link.label}
                      </motion.span>
                    </button>
                  );
                }
                return <SidebarLink key={idx} link={link} />;
              })}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col rounded-tl-2xl border border-gray-300 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-gray-700"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gray-700" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-gray-700"
      >
        Aqua Vision
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-gray-700"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gray-700" />
    </a>
  );
};
