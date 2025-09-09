"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconUser,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    occupation: "Software Engineer",
    age: "28",
    gender: "Male"
  });

  const [isEditing, setIsEditing] = useState(false);

  const links = [
    {
      label: "Generate Report",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-100" />
      ),
    },
    {
      label: "Recents",
      href: "#",
      icon: (
        <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: "John Doe",
      email: "john.doe@example.com",
      occupation: "Software Engineer",
      age: "28",
      gender: "Male"
    });
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden bg-neutral-800 md:flex-row",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Profile",
                href: "/profile",
                icon: (
                  <IconSettings className="h-7 w-7 shrink-0 text-neutral-200" />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <ProfileContent 
        profileData={profileData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export const Logo = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-white"
      >
        Metal Craft
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white" />
    </a>
  );
};

interface ProfileContentProps {
  profileData: {
    name: string;
    email: string;
    occupation: string;
    age: string;
    gender: string;
  };
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  handleInputChange: (field: string, value: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const ProfileContent = ({
  profileData,
  isEditing,
  setIsEditing,
  handleInputChange,
  handleSave,
  handleCancel,
}: ProfileContentProps) => {
  return (
    <div className="flex flex-1">
      <div className="flex h-full w-full flex-1 flex-col gap-6 rounded-tl-2xl border border-neutral-700 bg-neutral-900 p-6 md:p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <IconUser className="h-8 w-8 text-white" />
            <h1 className="text-3xl font-bold text-white">Profile</h1>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="rounded-xl"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Avatar Card */}
          <Card className="w-full lg:w-80 rounded-2xl border-neutral-700 bg-neutral-800">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://via.placeholder.com/150x150/4f46e5/ffffff?text=JD" />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-white text-xl">{profileData.name}</CardTitle>
              <CardDescription className="text-neutral-400">
                {profileData.occupation}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-neutral-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Active</span>
                </div>
               
              </div>
            </CardContent>
          </Card>

          {/* Profile Details Card */}
          <Card className="flex-1 rounded-2xl border-neutral-700 bg-neutral-800">
            <CardHeader>
              <CardTitle className="text-white text-xl">Personal Information</CardTitle>
              <CardDescription className="text-neutral-400">
                Manage your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-medium">
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="rounded-xl border-neutral-600 bg-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 rounded-xl bg-neutral-700 text-white">
                      {profileData.name}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="rounded-xl border-neutral-600 bg-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="p-3 rounded-xl bg-neutral-700 text-white">
                      {profileData.email}
                    </div>
                  )}
                </div>

                {/* Occupation Field */}
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-white font-medium">
                    Occupation
                  </Label>
                  {isEditing ? (
                    <Input
                      id="occupation"
                      value={profileData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className="rounded-xl border-neutral-600 bg-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
                      placeholder="Enter your occupation"
                    />
                  ) : (
                    <div className="p-3 rounded-xl bg-neutral-700 text-white">
                      {profileData.occupation}
                    </div>
                  )}
                </div>

                {/* Age Field */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-white font-medium">
                    Age
                  </Label>
                  {isEditing ? (
                    <Input
                      id="age"
                      type="number"
                      value={profileData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="rounded-xl border-neutral-600 bg-neutral-700 text-white placeholder:text-neutral-400 focus:border-blue-500"
                      placeholder="Enter your age"
                    />
                  ) : (
                    <div className="p-3 rounded-xl bg-neutral-700 text-white">
                      {profileData.age} years old
                    </div>
                  )}
                </div>

                {/* Gender Field */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="gender" className="text-white font-medium">
                    Gender
                  </Label>
                  {isEditing ? (
                    <select
                      id="gender"
                      value={profileData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full p-3 rounded-xl border border-neutral-600 bg-neutral-700 text-white focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="p-3 rounded-xl bg-neutral-700 text-white">
                      {profileData.gender}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSave}
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="flex-1 rounded-xl border-neutral-600 text-white hover:bg-neutral-700"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
