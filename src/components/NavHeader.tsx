import React from 'react'
import { Link } from "react-router-dom"

export default function NavHeader () {
    return (
        <header>
            <nav className='nav-header'>
                <Link to='/'>Home</Link>
                <Link to='/helloworld'>helloworld</Link>
                <Link to='/login'>Login</Link>
                <Link to='/sandbox'>Sandbox</Link>
                <Link to='/addworkout'>Add Workout</Link>
            </nav>
        </header>
    )
}