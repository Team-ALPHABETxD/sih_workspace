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
      <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900 rounded-tl-2xl border border-gray-300">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-6 p-6 md:p-10 overflow-y-auto bg-gray-50 text-gray-900 rounded-tl-2xl border border-gray-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconUser className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Profile</h1>
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
        <Card className="w-full lg:w-80 rounded-2xl border-gray-300 bg-white">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://via.placeholder.com/150x150/4f46e5/ffffff?text=JD" />
                <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl text-gray-900">{profileData.name}</CardTitle>
            <CardDescription className="text-gray-600">
              {profileData.occupation}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card className="flex-1 rounded-2xl border-gray-300 bg-white">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Personal Information</CardTitle>
            <CardDescription className="text-gray-600">
              Manage your personal details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
                  Full Name
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-900">
                    {profileData.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  Email Address
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-900">
                    {profileData.email}
                  </div>
                )}
              </div>

              {/* Occupation Field */}
              <div className="space-y-2">
                <Label htmlFor="occupation" className="font-medium">
                  Occupation
                </Label>
                {isEditing ? (
                  <Input
                    id="occupation"
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="Enter your occupation"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-900">
                    {profileData.occupation}
                  </div>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <Label htmlFor="age" className="font-medium">
                  Age
                </Label>
                {isEditing ? (
                  <Input
                    id="age"
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="rounded-xl border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus:border-blue-500"
                    placeholder="Enter your age"
                  />
                ) : (
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-900">
                    {profileData.age} years old
                  </div>
                )}
              </div>

              {/* Gender Field */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="gender" className="font-medium">
                  Gender
                </Label>
                {isEditing ? (
                  <select
                    id="gender"
                    value={profileData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                ) : (
                  <div className="p-3 rounded-xl bg-gray-100 text-gray-900">
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
                  className="flex-1 rounded-xl border-gray-300 text-gray-900 hover:bg-gray-100"
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
