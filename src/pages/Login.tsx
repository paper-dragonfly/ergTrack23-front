import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useSearchParams } from 'react-router-dom';

import { API_URL } from '../config';
import { auth, signInWithGoogle } from '../utils/firebase';


export default function Login() {
  console.log('running Login')

  const [userToken, setUserToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [newUser, setNewUser] = useState(false)
  const { handleSubmit, formState } = useForm()

  const [searchParams, setSearchParams] = useSearchParams()
  const pathname = searchParams.get("redirectTo") || "/dashboard"

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    if (name === 'email') {
      setUserEmail(value)
    } else if (name === 'password') {
      setUserPassword(value)
    }
  }

  function handleClickNewUser() {
    setNewUser(!newUser)
  }

  function emailPasswordSignIn() {
    setLoading2(true)
    const action = newUser ? 'create new user with user and PW' : 'signing in with user and PW';

    const authFunction = newUser ? createUserWithEmailAndPassword : signInWithEmailAndPassword;

    console.log(action);

    authFunction(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in 
        console.log('userCred', userCredential);
        const idToken = userCredential.user.getIdToken()
        console.log('idToken', idToken)
        return idToken
      })
      // authenticate user with ergTrack server, get user_token 
      .then((idToken) => {
        const url = API_URL + '/login/'
        const postInfo = {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
          })
        }
        fetch(url, postInfo)
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }else{
                console.error('Error code:', response.status)
                return response.json().then((errorData) => {
                    console.error('Error details:', errorData);
                    throw new Error('Error on func: emailPasswordSignIn');
                })
          }})
          .then(data => {
            console.log(data)
            const userToken = data["user_token"]
            const userTeamId = data["team_id"] ? data["team_id"] : JSON.stringify(null)
            sessionStorage.setItem('userToken', userToken)
            sessionStorage.setItem('userTeamId', userTeamId)
            return userToken
          })
          .then(userToken => setUserToken(userToken))
          .catch(error => console.error(error.message))
      })
  }



  function signIn() {
    signInWithGoogle()
      // authenticate user with firebase and get idToken
      .then((result) => {
        setLoading(true)
        console.log(result)
        const idToken = result.user.getIdToken()
        console.log('idToken', idToken)
        const userEmail = result.user.email 
        return {idToken, userEmail}
      })
      // authenticate user with ergTrack server, get user_token 
      .then(({idToken, userEmail}) => {
        const url = API_URL + '/login/'
        const postInfo = {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
          })
        }
        fetch(url, postInfo)
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json()
            }else{
                console.error('Error code:', response.status)
                return response.json().then((errorData) => {
                    console.error('Error details:', errorData);
                    throw new Error('Error on func: signInWithGoogle');
                })
          }})
          .then(data => {
            console.log(data)
            const userToken = data["user_token"]
            const userTeamId = data["team_id"] ? data["team_id"] : JSON.stringify(null)
            sessionStorage.setItem('userToken', userToken)
            sessionStorage.setItem('userTeamId', userTeamId)
            return userToken
          })
          .then(userToken => setUserToken(userToken))
          .catch(error => console.error(error.message))

      })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {userToken && <Navigate to={pathname} />}
      <br />
      <h1 className='text-2xl font-bold'>{newUser ? "Sign Up" : "Log In"} </h1>
      <form onSubmit={handleSubmit(emailPasswordSignIn)} className='login-form'>
        <fieldset className='flex flex-col items-center'>
          <label>
            <span><b>Email</b></span>
            <input
              type='text'
              name='email'
              value={userEmail}
              onChange={handleChange}
              placeholder='email'
              className='team-input'
              required
            />
          </label>
          <br />
          <label>
            <span><b>Password</b></span>
            <input
              type='password'
              name='password'
              value={userPassword}
              onChange={handleChange}
              className='team-input'
              placeholder='pw'
              required
            />
          </label>
          <br />
          <button type='submit' className='btn small my-4 justify-center'>{loading2 ? 'Logging in...' : "Submit"}</button>
        </fieldset>
      </form>
      {newUser ?
        <div>
          <p>Already have an account? </p>
          <button className="underline" onClick={handleClickNewUser}>Sign In</button>
        </div>
        :
        <div>
          <p>New to this app? </p> <button className="underline" onClick={handleClickNewUser}>Sign Up</button>
        </div>
      }

      <br />

      <h3>OR</h3>
      <br />

      <div className='flex pt-6 justify-center gap-6'>
        <button className="login-with-google-btn" onClick={signIn}>{loading ? 'Logging in...' : 'Sign in with Google'}</button>
      </div>

    </div>
  )
}



