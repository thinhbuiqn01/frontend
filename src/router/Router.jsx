import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Business from "../pages/Business";
import BusinessView from "../pages/BusinessView";
import NotFound from "../pages/NotFound";
import ManageStudent from "../school/ManageStudent";
import School from "../school/School";
import DetailsStudent from "../school/DetailsStudent";
import { AdminBusiness, AdminCareer, AdminDashboard, AdminSchool, AdminStudents, AdminTechnology } from "../Admin";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/dang-ky",
        element: <Signup />,
      },
      {
        path: "/dang-nhap",
        element: <Login />,
      },

      {
        path: "/cong-ty",
        element: <Business />,
      },
      {
        path: "/them-cong-ty",
        element: <BusinessView />,
      },
      {
        path: "/truong/sinh-vien",
        element: <ManageStudent />,
      },
      {
        path: "/truong/sinh-vien/xem",
        element: <DetailsStudent />,
      },

      {
        path: "/trang-truong",
        element: <School />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        path: "/admin/cong-nghe",
        element: <AdminTechnology />,
      },
      {
        path: "/admin/nganh-nghe",
        element: <AdminCareer />,
      },
      {
        path: "/admin/sinh-vien",
        element: <AdminStudents />,
      },
      {
        path: "/admin/doanh-nghiep",
        element: <AdminBusiness />,
      },
      {
        path: "/admin/nha-truong",
        element: <AdminSchool />,
      },
      {
        path: "/admin/sinh-vien/xem",
        element: <DetailsStudent />,
      },
    ],
  },
]);

export default Router;
