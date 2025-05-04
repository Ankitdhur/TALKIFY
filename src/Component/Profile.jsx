import React, { useRef, useState } from 'react'
import { ArrowLeft, Pen, UserCheck } from 'lucide-react'
import { useAuth } from './AuthContext'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { DB } from '../../firebase';
import { updateDoc,doc } from 'firebase/firestore';

function Profile(props) {
  const navigate = useNavigate();
  const { userData,setUserData } = useAuth();
  const {onBack,darkMode}=props;
  const [username,setUserName]=useState(userData.name);
  const inputRef=useRef(null);



  const handleProfileName = async () => {
    if (inputRef.current) {
      inputRef.current.blur();
    }
  
    if (username !== userData.name) {
      const userRef = doc(DB, "users", userData?.id);
      await updateDoc(userRef, { name: username });
  
      // directly update the local userData
      setUserData(prev => ({
        ...prev,
        name: username
      }));
    }
  };
  

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-background'} w-[30vw] h-full flex flex-col gap-8`}>
      {/* Top Bar */}
      <div className={`${darkMode ? 'bg-primary text-white' : 'bg-primary text-white'} p-4 text-lg flex items-center gap-4`}>
        <button onClick={onBack}><ArrowLeft /></button>
        <div>Profile</div>
      </div>
  
      {/* User Photo */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center gap-4 py-8`}>
        <img 
          src={userData.photoURL} 
          alt="" 
          className="rounded-full h-24 w-24 border-4 border-primary object-cover"
        />
      </div>
  
      {/* User Name */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} h-20 flex justify-center items-center gap-1`}>
        <button title="Edit Your Profile Name " className={`${darkMode ? 'text-primaryDark' : ' text-primary'}`} onClick={()=>{
          if(inputRef.current){
            inputRef.current.focus();
          }
        }}><Pen/></button>
        <input ref={inputRef} title='Change Your User Name ' className={`text-xl font-semibold text-center focus:outline-primaryDark rounded-md cursor-pointer  ${darkMode ? 'text-white   placeholder-gray-400 bg-gray-800 ' : 'text-grayDark placeholder-gray-500'}`} placeholder='Enter your name...' value={username} onChange={(e)=>{
          setUserName(e.target.value);
        }}/>
        <button onClick={handleProfileName} disabled={username==="" || username === userData.name} className={`${darkMode ? 'text-primaryDark' : ' text-primary'} ${username==="" || username === userData.name ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer' }`}><UserCheck/></button>
      </div>
  
      {/* User Email */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} h-20 flex justify-center items-center`}>
        <h2 className={`${darkMode ? 'text-gray-300' : 'text-grayLight'}`}>{userData.email}</h2>
      </div>
  
      {/* Logout Button */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} h-20 flex justify-center items-center`}>
        <button 
          onClick={handleLogout} 
          className='text-white px-4 py-3 rounded bg-primary hover:bg-primaryDark transition'
        >
          Logout
        </button>
      </div>
    </div>
  )
  
}

export default Profile
