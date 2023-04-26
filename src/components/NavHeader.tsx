import React, {useState} from 'react'
import { NavLink, redirect } from "react-router-dom"
import { firebaseSignOut } from '../utils/firebase';


const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

export default function NavHeader () {
     
    function signOut(){
        firebaseSignOut()
          .then(() => {
            console.log('signing out')
            sessionStorage.removeItem('userToken')
          })
        //   .then(()=> {
        //     return redirect('/')
        // })
      }
    return (
        <header>
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
                <button onSubmit={signOut}>Log Out</button>
            </nav>
        </header>
    )
}