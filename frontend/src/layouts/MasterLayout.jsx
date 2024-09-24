import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MasterLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MasterLayout;
