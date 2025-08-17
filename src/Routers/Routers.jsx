import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <h2>Error Page</h2>,
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
