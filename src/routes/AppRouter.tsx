import { Routes, Route, Navigate } from "react-router-dom";
import FullPortfolioPage from "../pages/FullPortfolioPage";
import Admin from "../pages/Admin";
import AdminProjects from "../pages/admin/adminProjects";
import NewProject from "../pages/admin/NewProject";
import EditProject from "../pages/admin/EditProject";
import AdminCertifications from "../pages/admin/adminCertifications";
import NewCertification from "../pages/admin/newCertification"; // ✅ add this
import EditCertification from "../pages/admin/EditCertification"; // ✅ add this
import { SignIn } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function AppRouter() {
  return (
    <div className="bg-background-dark min-h-screen text-white">
      <Routes>
        {/* Full Portfolio Single Page */}
        <Route path="/" element={<FullPortfolioPage />} />

        {/* Auth Route */}
        <Route
          path="/sign-in"
          element={
            <>
              <SignedOut>
                <div className="flex flex-col justify-center items-center px-4 min-h-screen text-white text-center">
                  <h1 className="mb-2 font-bold text-3xl">Welcome Back</h1>
                  <p className="mb-6 max-w-md text-gray-400 text-sm">
                    Sign in to access the admin dashboard and manage your portfolio content.
                  </p>

                  <div className="w-full max-w-sm">
                    <SignIn
                      redirectUrl="/admin"
                      appearance={{
                        elements: {
                          card: "bg-neutral-900 text-white border-neutral-700",
                        },
                      }}
                    />
                  </div>
                </div>
              </SignedOut>
              <SignedIn>
                <Navigate to="/admin" />
              </SignedIn>
            </>
          }
        />

        {/* Admin Dashboard */}
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

        {/* Admin: Projects */}
        <Route
          path="/admin/projects"
          element={
            <>
              <SignedIn>
                <AdminProjects />
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

        {/* Admin: Certifications */}
        <Route
          path="/admin/certifications"
          element={
            <>
              <SignedIn>
                <AdminCertifications />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/certifications/new"
          element={
            <>
              <SignedIn>
                <NewCertification />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/admin/certifications/:id/edit"
          element={
            <>
              <SignedIn>
                <EditCertification />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in" />
              </SignedOut>
            </>
          }
        />

        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center min-h-screen text-white text-xl">
              Page not found
            </div>
          }
        />
      </Routes>
    </div>
  );
}