import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import AddWorkout from './pages/addWorkout/AddWorkout';
import Sandbox from './pages/Sandbox'
import Login from './pages/Login'


import reportWebVitals from './reportWebVitals'; //Note: not sure what this does

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// const [user, setUser] = useState('')

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "addworkout",
    element: <AddWorkout />
  },
  {
    path: "sandbox",
    element: <Sandbox />
  },
  {
    path: "login",
    element: <Login />
  }
])


root.render(
  <React.StrictMode>
    <RouterProvider router= {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
