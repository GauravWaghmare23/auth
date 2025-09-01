"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type UserData = {
  username?: string;
  email?: string;
  // add other properties if needed
};

export default function ProfilePage() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/users/me');
        console.log(response.data);
        
        // Extract user data from the response structure
        setData(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [])

  const handleLogout = async () => {
    try {
      // Call logout API endpoint if you have one
      await axios.post('/api/users/logout');
      
      // Clear any local storage or cookies if needed
      // localStorage.removeItem('token'); // if you store token in localStorage
      
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if logout API fails, redirect to login
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Top Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h2 className="text-xl font-bold text-slate-800">Profile</h2>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      </nav>

      {/* Profile Content */}
      <div className="flex flex-col items-center py-12">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-slate-300"
          />
          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {data?.username || "Unknown User"}
            </h1>
            <p className="text-slate-500 mb-4">Full Stack Developer</p>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-medium mr-2">
                {data?.email || "No email provided"}
              </span>
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-medium">
                New York, USA
              </span>
            </div>
            <p className="text-slate-600">
              Experienced developer skilled in React, Node.js, and Tailwind CSS.{" "}
              <br />
              Loves building modern web applications and UIs.
            </p>
          </div>
        </div>
        {/* Additional Section (editable/bio/stats) */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg max-w-2xl w-full p-8">
          <h2 className="text-xl font-bold mb-4 text-slate-800">About</h2>
          <p className="text-slate-600">
            Passionate about bringing great ideas to life using technology.
            Always learning, collaborating, and striving for pixel-perfect
            design.
          </p>
        </div>
      </div>
    </div>
  );
}