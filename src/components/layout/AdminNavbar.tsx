// src/components/AdminNavbar.tsx
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function AdminNavbar() {
  const { user } = useUser();

  return (
    <header className="bg-neutral-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary hover:underline">
          ← Back to Site
        </Link>
        {user && (
          <div className="text-sm text-gray-300">
            Signed in as: <span className="font-semibold">{user.emailAddresses[0]?.emailAddress}</span>
          </div>
        )}
      </div>
    </header>
  );
}