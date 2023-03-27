import React from 'react'
// import { Link } from "react-router-dom"

export default function NavHeader () {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Home</a>
                    </li>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Log</a>
                    </li>
                    <li>
                        {/* <Link to='/home'>Home</Link> */}
                        <a href='#'>Add Workout</a>
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