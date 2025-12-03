import { Outlet } from "react-router-dom";
import { NavBar } from "../../../shared/components/NavBar/NavBar";

export function ThemeLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
