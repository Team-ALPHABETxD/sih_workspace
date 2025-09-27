"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";
interface User {
  id: string;
  name?: string;
  email?: string;
  occ?: string;
  age?: number;
  gender?: string;
}

interface SignupData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  age: string;
  gen: string;
  occ: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/user/datafetch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch {
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        await fetchUserData(data.token);
        toast.success("Login successful!");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      setUser(null);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/server/v1/apis/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        // After signup, optionally auto-login or redirect handled by caller
      } else {
        const errorData = await res.json() as { message?: string };
        throw new Error(errorData.message || "Signup failed");
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
