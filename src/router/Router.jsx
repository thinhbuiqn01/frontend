import { createBrowserRouter, useNavigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Business from "../pages/Business";
import NotFound from "../pages/NotFound";
import School from "../school/School";

import { AdminEditSchool } from "../Admin/component/";
import {
  AdminBusiness,
  AdminDashboard,
  AdminJobs,
  AdminNewStudents,
  AdminSchool,
  AdminSchoolCreate,
  AdminStudents,
  AdminTechnology,
} from "../Admin";
import {
  SchoolBusiness,
  SchoolStudent,
  SchoolEditStudent,
  SchoolNewListStudent,
  SchoolBusinessDetails,
  SchoolReviewJob,
} from "../school";
import Profile from "../components/Profile";
import Jobs from "../pages/business/Jobs";
import NewJob from "../components/Business/NewJob";
import { BusinessEditJob } from "../components/Business";
import StudentPage from "../pages/students/StudentPage";
import { StudentCareer, StudentHome } from "../pages/students";

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
        element: <SchoolEditStudent />,
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
        path: "/truong/cong-viec/duyet/:idJob",
        element: <SchoolReviewJob />,
      },
      {
        path: "/trang-truong",
        element: <School />,
      },
      {
        path: "/doanh-nghiep/ho-so",
        element: <Profile />,
      },
      {
        path: "/",
        element: <StudentPage />,
        children: [
          {
            path: "/viec-lam",
            element: <StudentCareer />,
          },
          {
            path: "/",
            element: <StudentHome />,
          },
        ],
      },
      {
        path: "/doanhnghiep",
        element: <Business />,
      },
      {
        path: "/doanh-nghiep/cong-viec/:businessID",
        element: <BusinessEditJob />,
      },

      {
        path: "/doanh-nghiep/cong-viec",
        element: <Jobs />,
      },
      {
        path: "/doanh-nghiep/cong-viec/them",
        element: <NewJob />,
      },
      {
        path: "/ho-so",
        element: <SchoolEditStudent />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
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
        path: "/admin/nha-truong/them",
        element: <AdminSchoolCreate />,
      },
      {
        path: "/admin/nha-truong/xem/:idSchool",
        element: <AdminEditSchool />,
      },
      {
        path: "/admin/sinh-vien/xem/",
        element: <SchoolEditStudent />,
      },
      {
        path: "/admin/sinh-vien/them",
        element: <AdminNewStudents />,
      },
      {
        path: "/admin/cong-nghe",
        element: <AdminTechnology />,
      },
      {
        path: "/admin/cong-viec",
        element: <AdminJobs />,
      },
    ],
  },
]);

export default Router;
