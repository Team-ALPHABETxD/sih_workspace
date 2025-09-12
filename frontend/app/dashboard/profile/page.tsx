"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconUser } from "@tabler/icons-react";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    occupation: "",
    age: "",
    gender: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  console.log("User data:", user);
  console.log("User type:", typeof user);
  console.log("User keys:", user ? Object.keys(user) : "null");

  useEffect(() => {
    if (user && user.user) {
      setProfileData({
        name: user.user.name || "",
        email: user.user.email || "",
        occupation: user.user.occ || "",
        age: user.user.age?.toString() || "",
        gender: user.user.gender || ""
      });
    }
  }, [user]);

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
    // Reset to original data from user context
    if (user && user.user) {
      setProfileData({
        name: user.user.name || "",
        email: user.user.email || "",
        occupation: user.user.occ || "",
        age: user.user.age?.toString() || "",
        gender: user.user.gender || ""
      });
    }
    setIsEditing(false);
  };

  
  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 rounded-tl-2xl border border-gray-200">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-8 p-6 md:p-10 overflow-y-auto bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 rounded-tl-2xl border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconUser className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Profile</h1>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="rounded-lg px-6 py-2 text-sm font-medium transition-all duration-200 hover:scale-105"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Avatar Card */}
        <Card className="w-full lg:w-80 rounded-2xl border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="h-28 w-28 ring-4 ring-blue-50 ring-offset-2">
                  <AvatarImage src="https://via.placeholder.com/150x150/4f46e5/ffffff?text=JD" />
                  <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <CardTitle className="text-xl font-semibold text-gray-800 mb-1">{profileData.name || "No name"}</CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              {profileData.occupation || "No occupation"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Active</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card className="flex-1 rounded-2xl border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              Manage your personal details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-100">
                    {profileData.name || "No name provided"}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-100">
                    {profileData.email || "No email provided"}
                  </div>
                )}
              </div>

              {/* Occupation Field */}
              <div className="space-y-3">
                <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">
                  Occupation
                </Label>
                {isEditing ? (
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your occupation"
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-100">
                    {profileData.occupation || "No occupation provided"}
                  </div>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-3">
                <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                  Age
                </Label>
                {isEditing ? (
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Enter your age"
                  />
                ) : (
                  <div className="p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-100">
                    {profileData.age ? `${profileData.age} years old` : "No age provided"}
                  </div>
                )}
              </div>

              {/* Gender Field */}
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                  Gender
                </Label>
                {isEditing ? (
                  <select
                    id="gender"
                    value={profileData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full p-4 rounded-lg border border-gray-200 bg-white text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className="p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-100">
                    {profileData.gender || "No gender provided"}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-6 border-t border-gray-100">
                <Button
                  onClick={handleSave}
                  className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 py-3 transition-all duration-200"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
