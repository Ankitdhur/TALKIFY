import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

function Home(props) {
    const setIsLogin=props.setIsLogin
    const navigate = useNavigate()
    const handleLogout=async ()=>{
        //Logout logic(we have to logout from backend or google)
        await signOut(auth)
        setIsLogin(false)
        navigate('/login')
    } 
  return (<>
    <div>Home</div>
    <button onClick={handleLogout}>LogOut</button>
    </>
  )
}

export default Home