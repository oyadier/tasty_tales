import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import MasterLayout from "./layouts/MasterLayout";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Recipes from "./pages/Recipes";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "*", element: <Navigate to="/home" replace /> },
      { path: "create-recipe", element: <CreateRecipe /> },
      { path: "my-recipes", element: <Recipes /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
