import React from 'react'
import { NavLink } from "react-router-dom"

const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

export default function NavHeader () {
    return (
        <header>
            <nav className='nav-header'>
                <NavLink 
                    to='/' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                >Home</NavLink>
                <NavLink to='/helloworld'>helloworld</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/sandbox'>Sandbox</NavLink>
                <NavLink to='/addworkout'>Add Workout</NavLink>
            </nav>
        </header>
    )
}