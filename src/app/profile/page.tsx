"use client"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Top Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h2 className="text-xl font-bold text-slate-800">Profile</h2>
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition">
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
            <h1 className="text-3xl font-bold text-slate-800 mb-2">John Doe</h1>
            <p className="text-slate-500 mb-4">Full Stack Developer</p>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-sm font-medium mr-2">
                johndoe@example.com
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
