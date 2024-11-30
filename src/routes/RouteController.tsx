import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "../utils/Index.tsx";

const Home = lazy(() => import("./home/Home.tsx"))
const CompanyBranch = lazy(() => import("./dashboard/company-branch/CompanyBranch.tsx"))
const Users = lazy(() => import("./dashboard/users/Users.tsx"))

const Auth = lazy(() => import("./auth/Auth.tsx"))
const Register = lazy(() => import("./auth/register/Register.tsx"))
const Login = lazy(() => import("./auth/login/Login.tsx"))

const RouteController = () => {
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><CompanyBranch/></Suspense>
        },
        {
          path: "users",
          element: <Suspense><Users/></Suspense>
        },
      ]
    },
    {
      path: "auth",
      element: <Suspense><Auth/></Suspense>,
      children: [
        {
          path: "",
          element: <Suspense><Login/></Suspense>
        },
        {
          path: "register",
          element: <Suspense><Register/></Suspense>
        }
      ]
    }
  ])
}
export default RouteController
