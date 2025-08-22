import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home"; 
import ErrorPage from "../Pages/ErrorPage/ErrorPage"; 
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/Home/SingUp/SingUp";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/productDetails",
        element: <ProductDetails></ProductDetails>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/singUp",
        element: <SingUp></SingUp>
      }
    ]
  },
]);
