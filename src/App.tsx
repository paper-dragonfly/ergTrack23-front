import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import './App.css';
import Demo from './Demo'
import NavHeader from './components/NavHeader'
import AddWorkout from './pages/addWorkout/AddWorkout'

const router = createBrowserRouter([
  {
    path:"/",
    element: <div>Hello World</div>
  }
])

function App() {
  return (
    <>
      <NavHeader />
      <h1>Hello world</h1>
      <Demo />
    </>
  );
}

export default App;
