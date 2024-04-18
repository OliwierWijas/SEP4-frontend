import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App.js';
import About from "./routes/About.js"
import { RouterProvider, createHashRouter } from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/About",
        element: <About />
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