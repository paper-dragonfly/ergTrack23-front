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
        <header>
            <nav className='flex justify-between items-center px-6 bg-bgGrey h-14 text-xl font-bold md:h-28 md:text-2xl'>
                <div onClick={() => setNav(!nav)} className="pl-4 z-10 delay-100 md:hidden">
                    {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
                </div>

                {/* hamburger menu */}
                {nav && (
                    <ul className='flex flex-col pt-28 items-center absolute top-0 left-0 w-full h-screen bg-bgGrey text-4xl font-bold gap-8'>
                        <NavLink to='/' onClick={() => setNav(!nav)}>Home</NavLink>
                        <NavLink to='/about' onClick={() => setNav(!nav)}>About</NavLink>
                        <NavLink to='/login' onClick={() => setNav(!nav)}>Sign Up</NavLink>
                    </ul>
                ) }


                <img src={logoWheel} alt="erg wheel" className="hidden md:flex md:max-h-16"/> 
                {/* <div className='flex'> */}
                <NavLink 
                    to='/'><img src={ergTrack} alt="ergTrack logo" className="self-center max-h-8 md:max-h-10" /></NavLink>
                <div className='flex'>
                {/* <NavLink 
                    to='/' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                    className="hidden md:flex"
                >Home</NavLink> */}
                <NavLink to='/login' className="text-xl font-bold">Login</NavLink>
                {/* <NavLink to='/about' className="hidden md:flex">About</NavLink> */}
                </div>
            </nav>
        </header>
    )
}