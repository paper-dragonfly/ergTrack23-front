import React, {useState} from 'react'
import { NavLink, redirect, Navigate } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa'
import { firebaseSignOut } from '../utils/firebase';
import ergTrack from "../assets/ergTrack.png"
import logoWheel from "../assets/logoWheel.png"



const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

export default function NavHeader () {
    const [logout, setLogout] = useState(false)
    console.log('running NavHeader')
    const [nav, setNav] = useState(false)

     
    function signOut(){
        console.log('logout1')
        firebaseSignOut()
          .then(() => {
            console.log('signing out')
            sessionStorage.removeItem('userToken')
          })
          .then(()=> {
            console.log('about to set logout to true')
            setLogout(true)
        })
      }

    return (
        <header className='px-6 md:px-10 bg-bgGrey lg:px-14'>
            {logout && <Navigate  to='/' />}
            <nav className='nav-header flex justify-between items-center h-14 text-xl font-bold md:h-28 lg:text-2xl'>
               
                    {/* hamburger menu icon */}
                    <div onClick={() => setNav(!nav)} className="flex z-20 delay-300 md:hidden">
                        {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
                    </div>

                    {/* open hamburger menu */}
                    {nav && (
                    <div className='flex flex-col pt-28 items-center absolute top-0 left-0 w-full h-screen bg-bgGrey text-4xl font-bold gap-8 z-10'>
                        <NavLink to='/addWorkout' onClick={() => setNav(!nav)}>Add Workout</NavLink>
                        <NavLink to='/log' onClick={() => setNav(!nav)}>View Log</NavLink>
                        <NavLink to='/team' onClick={() => setNav(!nav)}>Team</NavLink>
                        <NavLink to='/dashboard' onClick={() => setNav(!nav)}>Dashboard</NavLink>
                        <NavLink to='/about' onClick={() => setNav(!nav)}>About</NavLink>
                        <NavLink to='/profile' onClick={() => setNav(!nav)}>Profile</NavLink>
                        <NavLink to='/feedback' onClick={() => setNav(!nav)}>Give Feedback</NavLink>
                    </div>
                    ) }
                                    
                    <img src={ergTrack} alt="ergTrack logo" className="self-center  max-h-8 md:hidden" />
                    <span onClick={signOut} className='text-xl font-bold md:hidden'>Log Out</span>

                 {/* md/large screen nav */}
                <nav className='hidden md:flex md:justify-between md:w-full'>
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        <NavLink to='/dashboard'><img src={logoWheel} alt="erg wheel" className="hidden md:flex md:max-h-16"/> </NavLink>
                        <NavLink to='/dashboard'><img src={ergTrack} alt="ergTrack logo" className="hidden md:flex md:max-h-10"/></NavLink>
                    </div>
                    <ul className='hidden md:flex md:justify-between items-center   md:gap-4 lg:gap-8'>
                        <li><NavLink 
                            to='/dashboard' 
                            style={({isActive}) => isActive ? activeStyles : {}}
                        >Dashboard</NavLink></li>
                        <li><NavLink 
                            to='/addworkout' 
                            style={({isActive}) => isActive ? activeStyles : {}}
                        >Add Workout</NavLink></li>
                        <li><NavLink 
                            to='/log' 
                            style={({isActive}) => isActive ? activeStyles : {}}
                        >View Log</NavLink></li>
                        <li><NavLink 
                        to='/team' 
                        style={({isActive}) => isActive ? activeStyles : {}}
                       >Team</NavLink></li>
                        <li><NavLink 
                        to='/about' 
                        style={({isActive}) => isActive ? activeStyles : {}}
                       >About</NavLink></li>
                        <li><NavLink 
                            to='/profile' 
                            style={({isActive}) => isActive ? activeStyles : {}}
                            >Profile</NavLink></li>
                        <li><NavLink 
                            to='/feedback' 
                            style={({isActive}) => isActive ? activeStyles : {}}
                            >Give Feedback</NavLink></li>
                        <li><button onClick={signOut}>Log Out</button></li>
                    </ul>
                </nav>
            </nav>
        </header>
    )
}