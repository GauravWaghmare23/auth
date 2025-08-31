"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);


  // Handle login
  const onLogin = async () => {
    try {
      setLoading(true);
      
      // Basic validation
      if (!user.email || !user.password) {
        toast.error('Please fill in all fields');
      }

      const response = await axios.post('/api/users/login', user);
      toast.success('Login successful');
      console.log(response.data);
      router.push('/profile');
    } catch (error: any) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-3">
          Log in
        </h1>
        <p className="text-center text-slate-500 mb-6 text-sm">
          Welcome back! Please log in to your account
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-slate-900 focus:outline-none transition placeholder:text-slate-400"
              id="email"
              type="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-slate-900 focus:outline-none transition placeholder:text-slate-400"
              id="password"
              type="password"
              value={user.password}
              onChange={e => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <button
          className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-md py-2 px-4 transition shadow-md"
          onClick={onLogin}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-slate-700 font-medium underline">
            Sign up
          </Link>
        </p>
      </div>
      
      {/* Add the Toaster component */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}