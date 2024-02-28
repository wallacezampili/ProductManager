import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/pages/Register/register.jsx';
import Login from './components/pages/Login/Login.jsx';
import Home from './components/pages/Home/Home.jsx';
import Private from './components/layout/Private.jsx';
import AddProduct from './components/pages/Forms/AddProduct/AddProduct.jsx';
import EditProduct from './components/pages/Forms/EditProduct/EditProduct.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/add',
        element: <Private><AddProduct/></Private>
      },
      {
        path: '/edit/:id',
        element: <Private><EditProduct/></Private>
      },
      {
        path: '/',
        element: <Private><Home/></Private>
      }
      
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
