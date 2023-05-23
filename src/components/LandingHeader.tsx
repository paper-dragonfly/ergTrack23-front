import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from "react-router-dom"
import ergTrack from "../assets/ergTrack.png"
import logoWheel from "../assets/logoWheel.png"


const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}





export default function LandingHeader () {
    const [nav, setNav] = useState(false)

    console.log('running LandingHeader')
    return (
        <header className='px-6 md:px-10 bg-bgGrey '>
            <nav className='flex justify-between items-center h-14 text-xl font-bold md:h-28 md:text-2xl'>

                {/* hamburger menu icon */}
                <div onClick={() => setNav(!nav)} className="z-10 delay-100 md:hidden">
                    {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
                </div>

                {/* open hamburger menu */}
                {nav && (
                    <ul className='flex flex-col pt-28 items-center absolute top-0 left-0 w-full h-screen bg-bgGrey text-4xl font-bold gap-8'>
                        <NavLink to='/' onClick={() => setNav(!nav)}>Home</NavLink>
                        <NavLink to='/aboutergtrack' onClick={() => setNav(!nav)}>About</NavLink>
                        <NavLink to='/login' onClick={() => setNav(!nav)}>Sign Up</NavLink>
                    </ul>
                ) }

            {/* medium screen and larger */}
                <NavLink to='/'><img src={logoWheel} alt="erg wheel"
                    className="hidden md:flex md:max-h-16"/></NavLink>
               
                <NavLink 
                    to='/'><img src={ergTrack} alt="ergTrack logo" 
                    className=" max-h-8 md:max-h-10" /></NavLink>
                <div className='flex'>
           
                    <NavLink 
                        to='/about' 
                        style={({isActive}) => isActive ? activeStyles : {}}
                        className="hidden md:flex font-bold mr-6">About</NavLink>
                    <NavLink to='/login' 
                        style={({isActive}) => isActive ? activeStyles : {}}
                        className="text-xl font-bold md:text-2xl">Login</NavLink>
                
                </div>
            </nav>
        </header>
    )
}