import '../App.css';
import { firebaseSignOut, signInWithGoogle } from './firebase';
import { GoogleAuthProvider } from 'firebase/auth' 
import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000'

export default function Login() {
  console.log('app rendered')
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken')? sessionStorage.getItem('userToken'):"")
  const [userEmail, setUserEmail] = useState("")
  const [userName,  setUserName] = useState("")

  if(userToken){
    console.log('navigating to dashboard')
    return(<Navigate to='/dashboard' />)
  }


  function signIn(){
    signInWithGoogle()
    // authenticate user with firebase and get idToken
      .then((result) => {
        console.log(result)
        // const credential = GoogleAuthProvider.credentialFromResult(result)
        // console.log('Firebase credential',  credential)
        if(result.user.displayName){ 
            setUserName(result.user.displayName)}
        const idToken = result.user.getIdToken()
        // const idToken = credential?credential.idToken: null
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
            setUserToken(userToken)
          })
          .catch(error => console.error(error)) 
        
      })
  }

  function getEmail(){
    const url = API_URL+'/email/'
    fetch(
      url,
      {headers: 
        {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
        }
      }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setUserEmail(data["body"]["user_email"])
      })

  }

  function signOut(){
    firebaseSignOut()
      .then(() => {
        console.log('signed out')
        setUserToken("")
        setUserName("")
        setUserEmail("")
        sessionStorage.removeItem('userToken')
      })
  }



  return (
      <div className="App"> 
        <h1> Hello {userName? userName: 'World'}</h1>
        <br />
        <button className= "login-with-google-btn"  onClick={signIn}>sign in with google</button>
        <div className = 'showUserToken'>
          <h4> User Token </h4>
          <p>
            {userToken?userToken.substring(0,25)+'...':'no user logged in'}
          </p>
        </div>
        <button onClick={getEmail}> Get Email</button>
        <h4>User Email <br  /> {userEmail?userEmail : "_______"}</h4>
        <button onClick={signOut}>Sign Out</button>
      </div>
  );
}


