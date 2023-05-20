import { firebaseSignOut, signInWithGoogle } from '../utils/firebase';
import {useEffect, useState} from 'react';
import {Navigate, useLoaderData, useSearchParams} from 'react-router-dom'
import { API_URL } from '../config';


export default function Login() {
  console.log('running Login')

  const [userToken, setUserToken] = useState("")
  const [userName, setUserName] = useState("")
  const [demoLogin, setDemoLogin] = useState(false)

  const[searchParams, setSearchParams] = useSearchParams()
  const pathname = searchParams.get("redirectTo") || "/dashboard"

  function signIn(){
    signInWithGoogle()
    // authenticate user with firebase and get idToken
      .then((result) => {
        console.log(result)
        if(result.user.displayName){ 
            setUserName(result.user.displayName)}
        const idToken = result.user.getIdToken()
        console.log('idToken', idToken)
        return idToken
      })
      // authenticate user with ergTrack server, get user_token 
      .then((idToken) => {
        const url = API_URL+'/login/'
        fetch(
          url, 
          {headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            const userToken = data['body']["user_token"]
            sessionStorage.setItem('userToken', userToken)
            return userToken
          })
          .then(userToken => setUserToken(userToken))
          .catch(error => console.error(error)) 
        
      })
  }

  return (
    <div className="App"> 
        {userToken && <Navigate to={pathname} />}
        <br />
        <h1 className='text-xl font-bold text-center'>Sign in with</h1>
        <div className='flex pt-6 justify-center gap-6'>
          <button className= "login-with-google-btn"  onClick={signIn}>Google</button>
          <button className= "demo-login-btn"  onClick={()=> setDemoLogin(true)}>Demo</ button>
        </div>
        {demoLogin && <Navigate to='/dashboard' />}
    </div>
  )}
  


