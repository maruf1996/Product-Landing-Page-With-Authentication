import { createBrowserRouter } from "react-router-dom/dist";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Generator from "../components/Generator/Generator";
import Home from "../components/Home/Home";
import Main from "../layout/Main";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/generator",
        element: <Generator />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default routes;
