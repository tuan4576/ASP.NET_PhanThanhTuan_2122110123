import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router";
// import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import Dashboard from './pages/Dashboard.tsx';
import UserManagement from './pages/UserManagement.tsx';
import ProductManagement from './pages/ProductManagement.tsx';
import CategoryList from './pages/CategoryManagement.tsx';
import Login from './pages/Login.tsx';
import { Navigate } from "react-router-dom";
import OrderManagement from './pages/OrderManagement.tsx';
import PostManagement from './pages/PostManagement.tsx';
import ContactManagement from './pages/ContactManagement.tsx';
import ReviewManagement from './pages/ReviewManagement.tsx';
import EditUser from './edit/EditUser.tsx';
import AddUser from './add/AddUser.tsx';
import EditProduct from './edit/EditProduct.tsx';
import AddProduct from './add/AddProduct.tsx';
import EditCategory from './edit/EditCategory.tsx';
import AddCategory from './add/AddCategory.tsx';
import ProductDetail from './pages/ProductDetail.tsx';
import OrderDetail from './pages/OrderDetail.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path:"/auth/login",
    element:<Login/>
  },
  {
    // path: "/",
    element:<App/>,
    children:[
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {

        path:"/usermanagement",
        element:<UserManagement/>
      },
      {
        path:"/productmanagement",
        element:<ProductManagement/>
      },
      {
        path:"/categorymanagement",
        element:<CategoryList/>
      },
      {
        path:"/ordermanagement",
        element:<OrderManagement/>
      },
      {
        path:"/postmanagement",
        element:<PostManagement/>
      },
      {
        path:"/contactmanagement",
        element:<ContactManagement/>
      },
      {
        path:"/reviewmanagement",
        element:<ReviewManagement/>
      },
      {
        path:"/edituser/:id",
        element:<EditUser/>
      },
      {
        path:"/adduser",
        element:<AddUser/>
      },
      {
        path:"/editproduct/:id",
        element:<EditProduct/>
      },
      {
        path:"/addproduct",
        element:<AddProduct/>
      },
      {
        path:"/editcategory/:id",
        element:<EditCategory/>
      },
      {
        path:"/addcategory",
        element:<AddCategory/>
      },
      {
        path:"/productdetail/:id",
        element:<ProductDetail/>
      },
      {
        path:"/orderdetail",
        element:<OrderDetail/>
      }

    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
