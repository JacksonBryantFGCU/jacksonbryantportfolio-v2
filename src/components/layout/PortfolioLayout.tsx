// components/layout/PortfolioLayout.tsx
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function PortfolioLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}