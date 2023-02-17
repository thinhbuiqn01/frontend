import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Business from "../pages/Business";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cong-ty", element: <Business /> },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dang-nhap",
        element: <Login />,
      },
    ],
  },
]);

export default Router;
