import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom"


import RootLayout from './components/RootLayout';
import AddWorkout, {loader as addWorkoutloader} from './pages/addWorkout/AddWorkout';
import Login from './pages/Login';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import AuthRequiredLayout from './components/AuthRequiredLayout';
import Log, {loader as logLoader} from './pages/Log';
import About from './pages/About';
import PublicLayout from './components/PublicLayout';
import {loader as AuthLoader} from './components/AuthRequiredLayout'
import { checkAuth } from './utils/helper';
import WorkoutDetails, {loader as detailsLoader} from './pages/WorkoutDetails';
import Submitted from './pages/addWorkout/Submitted';
import Deleted from './pages/Deleted';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout /> } errorElement={<ErrorPage />} >
      <Route element={<PublicLayout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route element={<AuthRequiredLayout />} loader={AuthLoader} > 
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="addworkout" element={<AddWorkout />} loader = {addWorkoutloader} />
        <Route path="log" element={<Log />} loader = {logLoader}/>
        <Route path="profile" element={<h1>Athlete Profile</h1>} />
        <Route path='log/details' element={<WorkoutDetails />} loader = {detailsLoader}/>
        <Route path='addworkout/submitted' element={<Submitted />} />
        <Route path='log/deleted' element={<Deleted />} />
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
