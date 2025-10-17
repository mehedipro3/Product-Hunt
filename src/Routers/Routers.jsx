import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Login/Login";
import SingUp from "../Pages/Home/SingUp/SingUp";
import AllProducts from "../Pages/AllProducts/AllProducts";
import ContactUs from "../Pages/ContactUs/ContactUs";
import DashBoard from "../Layouts/DashBoard";
import AdminHome from "../DashBoard/Admin/AdminHome";
import AddProduct from "../DashBoard/AddProducts/Addproducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/contactUs",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/singUp",
        element: <SingUp></SingUp>,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "addProducts",
        element: <AddProduct></AddProduct>,
      },
    ],
  },
]);
