import React from 'react'
import { useNavigate } from 'react-router-dom'
//auth-Step3
import { signInWithPopup } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../../firebase'

function Login(props) {
  if(props.isLogin){
    navigate("/")
    return
  }
    const setIsLogin=props.setIsLogin
    const navigate = useNavigate()
    const handleLogin=async ()=>{
        // Login logic here 
        //auth-Step-4
        const result=await signInWithPopup(auth,new GoogleAuthProvider)
        setIsLogin(true)
        navigate('/')
    }
  return (<>
    <div>SignIn</div>
      <div>Sign in with your google account to get started</div>
      <button onClick={handleLogin} >Log In</button>
      </>
  )
}

export default Login