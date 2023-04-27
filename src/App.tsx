import React from 'react';
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
import Dashboard from './pages/Dashboard';
import AuthRequiredLayout from './components/AuthRequiredLayout';
import Log from './pages/Log';
import About from './pages/About';
import PublicLayout from './components/PublicLayout';
import {loader as AuthLoader} from './components/AuthRequiredLayout'
import { checkAuth } from './utils/helper';


const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<RootLayout /> } errorElement={<ErrorPage />} >
    <Route path="/" element={<RootLayout /> } errorElement={<ErrorPage />} >
      <Route element={<PublicLayout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route element={<AuthRequiredLayout />} loader={AuthLoader} > 
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="addworkout" element={<AddWorkout />} />
        <Route path="log" element={<Log />} />
        <Route path="helloworld" element={<h1>hello world</h1>} />
      </Route>
    </Route>
  )
)

function App() {
  console.log('running app')
  return (
    <RouterProvider router={router} />
  )
}

export default App;
