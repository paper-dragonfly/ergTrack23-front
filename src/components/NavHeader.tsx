import React, {useState} from 'react'
import { NavLink, redirect, Navigate } from "react-router-dom"
import { firebaseSignOut } from '../utils/firebase';


const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

export default function NavHeader () {
    const [logout, setLogout] = useState(false)
    console.log('runningg NavHeader')

     
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
        <header>
            {logout && <Navigate  to='/' />}
            <nav className='nav-header'>
                <NavLink 
                    to='/dashboard' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                >Dashboard</NavLink>
                <NavLink 
                    to='/helloworld' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                >helloworld</NavLink>
                <NavLink 
                    to='/log' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                >Log</NavLink>
                <NavLink 
                    to='/addworkout' 
                    style={({isActive}) => isActive ? activeStyles : {}}
                >Add Workout</NavLink>
                <button onClick={signOut}>Log Out</button>
            </nav>
        </header>
    )
}