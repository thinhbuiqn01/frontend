import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Business from "../pages/Business";
import BusinessView from "../pages/BusinessView";
import NotFound from "../pages/NotFound";
import School from "../school/School";
import {
  AdminBusiness,
  AdminCareer,
  AdminDashboard,
  AdminNewStudents,
  AdminSchool,
  AdminStudents,
  AdminTechnology,
} from "../Admin";
import {
  SchoolBusiness,
  SchoolStudent,
  SchoolDetailsStudent,
  SchoolNewListStudent,
  SchoolBusinessDetails,
} from "../school";
import DetailsStudent from "../school/DetailsStudent";
import Profile from "../components/Profile"; 
import Jobs from "../pages/Jobs";

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
        path: "/truong/sinh-vien",
        element: <SchoolStudent />,
      },
      {
        path: "/truong/sinh-vien/them",
        element: <SchoolNewListStudent />,
      },
      {
        path: "/truong/sinh-vien/xem",
        element: <SchoolDetailsStudent />,
      },
      {
        path: "/truong/doanh-nghiep",
        element: <SchoolBusiness />,
      },
      {
        path: "/truong/doanh-nghiep/xem",
        element: <SchoolBusinessDetails />,
      },
      {
        path: "/trang-truong",
        element: <School />,
      }, 
      {
        path: "/ho-so",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doanhnghiep",
        element: <Business />,
      },
      {
        path: "/doanh-nghiep/cong-viec",
        element: <Jobs />,
      },
      {
        path: "/doanh-nghiep/cong-viec/them",
        element: <Jobs />,
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
      {
        path: "/admin/sinh-vien/them",
        element: <AdminNewStudents />,
      },
    ],
  },
]);

export default Router;
