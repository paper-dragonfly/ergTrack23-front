import React from 'react'
import { NavLink } from "react-router-dom"

const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

export default function LandingHeader () {
    console.log('runningg LandingHeader')
    return (
        <header>
            <nav className='landing-header'>
                <NavLink 
                    to='/' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                >Home</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/about'>About</NavLink>
            </nav>
        </header>
    )
}