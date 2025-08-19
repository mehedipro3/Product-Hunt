import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home"; 
import ErrorPage from "../Pages/ErrorPage/ErrorPage"; 
import ProductDetails from "../Pages/ProductDetails/ProductDetails";



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
      }
    ]
  },
]);
