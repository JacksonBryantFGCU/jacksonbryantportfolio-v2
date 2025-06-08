import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Admin from "../pages/Admin";

export default function ProtectedAdmin() {
  return (
    <>
      <SignedIn>
        <Admin />
      </SignedIn>
      <SignedOut>
        <div className="mt-10 text-red-500 text-center">
          You must be signed in to access the admin dashboard.
        </div>
      </SignedOut>
    </>
  );
}
