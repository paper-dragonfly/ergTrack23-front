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
import Team, {loader as teamLoader} from './pages/team/Team';
import PublicLayout from './components/PublicLayout';
import {loader as AuthLoader} from './components/AuthRequiredLayout'
import { checkAuth } from './utils/helper';
import WorkoutDetails, {loader as detailsLoader} from './pages/WorkoutDetails';
import Submitted from './pages/addWorkout/Submitted';
import Deleted from './pages/Deleted';
import ProfileView, {loader as profileViewLoader} from './pages/ProfileView';
import ProfileEdit, {action as profileEditAction} from './pages/ProfileEdit';
import Sandbox from './pages/Sandbox';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout /> } errorElement={<ErrorPage />} >
      <Route element={<PublicLayout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="aboutergtrack" element={<About />} />
        <Route path="sandbox" element={<Sandbox />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
      <Route element={<AuthRequiredLayout />} loader={AuthLoader} > 
        <Route path='dashboard' element={<Dashboard />} />
        <Route path="addworkout" element={<AddWorkout />} loader = {addWorkoutloader} />
        <Route path="log" element={<Log />} loader = {logLoader}/>
        <Route path="team" element={<Team />} loader={teamLoader}/>
        <Route path="profile" element={<ProfileView />} loader = {profileViewLoader} />
        <Route path="about" element={<About />} />
        
        <Route path="profile/edit" element={<ProfileEdit />} action={profileEditAction}/>
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
