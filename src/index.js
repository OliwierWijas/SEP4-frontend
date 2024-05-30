import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App.js';
import { RouterProvider, createHashRouter } from "react-router-dom"
import MyHome from './routes/MyHome.js';
import HomePage from './routes/HomePage.js';
import Login from './routes/Login.js';
import SignUp from './routes/SignUp.js';
import MyProfile from './routes/MyProfile.js';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
            {
        path: "/SignUp",
        element: <SignUp />
      },
      {
        path: "/Login",
        element: <Login />
      },
      {
        path: "/MyHome",
        element: <MyHome />
      },
      {
        path: "/MyProfile",
        element: <MyProfile />
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);