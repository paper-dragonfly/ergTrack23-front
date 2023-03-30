import React from 'react'
import { Link } from "react-router-dom"

export default function NavHeader () {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/sandbox'>Sandbox</Link>
                    </li>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Log</a>
                    </li>
                    <li>
                        <Link to='addworkout'>Add Workout</Link>
                        {/* <a href='http://localhost:3000/addworkout'>Add Workout</a> */}
                    </li>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Summary Stats</a>
                    </li>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Profile</a>
                    </li>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Logout</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}