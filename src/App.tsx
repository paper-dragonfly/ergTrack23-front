import React, {useState} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"

import './App.css';
import RootLayout from './components/RootLayout';
import AddWorkout from './pages/addWorkout/AddWorkout';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Sandbox from './pages/Sandbox';


function checkLoggedIn(){
  const loggedIn = true
  // let user = localStorage.getItem("user")
  return loggedIn
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route index element={checkLoggedIn()?<Home />:<Login />} />
      <Route path="helloworld" element={<h1>hello world</h1>} />
      <Route path="login" element={<Login />} />
      <Route path="addworkout" element={<AddWorkout />} />
      <Route path="sandbox" element={<Sandbox />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
