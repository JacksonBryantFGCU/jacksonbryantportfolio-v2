import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import About from "../pages/About";
import Resume from "../pages/Resume";
import Admin from "../pages/Admin";
import NewProject from "../pages/admin/NewProject";
import EditProject from "../pages/admin/EditProject";
import { SignIn } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from "../components/layout/Navbar";

export default function AppRouter() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route
          path="/sign-in"
          element={
            <>
              <SignedOut>
                <SignIn redirectUrl="/admin" />
              </SignedOut>
              <SignedIn>
                <Navigate to="/admin" />
              </SignedIn>
            </>
          }
        />

        {/* Protected Admin Pages */}
        <Route
          path="/admin"
          element={
            <>
              <SignedIn>
                <Admin />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/projects/new"
          element={
            <>
              <SignedIn>
                <NewProject />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/projects/:id/edit"
          element={
            <>
              <SignedIn>
                <EditProject />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            </>
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center min-h-screen text-white text-xl">
              Page not found
            </div>
          }
        />
      </Routes>
    </>
  );
}