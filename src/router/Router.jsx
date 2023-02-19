import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Business from "../pages/Business";
import BusinessView from "../pages/BusinessView";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cong-ty", element: <Business /> },
      {
        path: "/them-cong-ty",
        element: <BusinessView />,
      },
      {
        path: "/dang-ky",
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
