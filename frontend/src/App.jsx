import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MasterLayout from "./layouts/MasterLayout";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
