import React, { useRef, useState } from 'react'
import { onSnapshot, collection } from 'firebase/firestore';
import {DB} from '../../firebase';
import { CircleFadingPlusIcon, UserRoundIcon, MoonStar } from 'lucide-react';
import Profile from './Profile';
import { useAuth } from './AuthContext';
import UserCard from './UserCard';

function ChatPanel(props) {
  const [user,setUser]=React.useState([]);
  const [isloading,setIsLoading]=React.useState(true);
  const [showProfile,setShowProfile]=React.useState(false);
  const {userData}=useAuth();
  const [searchUser,setSearchUser]=useState("");
  const [filterArray,setFilterArray]=useState([]);
  const {darkMode,setDarkMode}=props;
  const searchBarRef=useRef(null)
  React.useEffect(() => {
    const unsub = onSnapshot(collection(DB, "users"), (snapshot) => {
      const arrayOfUsers = snapshot.docs.map(doc => ({
        data: doc.data(),
        id: doc.id
      }));
      console.log(arrayOfUsers);
      setUser(arrayOfUsers);
      setFilterArray(arrayOfUsers);
      setIsLoading(false);
    });
  
    // Clean up the listener when component unmounts
    return () => unsub();
  }, []);;// use effect funtion will call the getUsers(); after first render and empty array means it is calling once
  
  React.useEffect(() => {
    const filterArray = user.filter(u =>
      u.data.name?.toLowerCase().includes(searchUser.toLowerCase())
    );
    setFilterArray(filterArray);
  }, [searchUser, user]);
  
  
const onBack=()=>{
    setShowProfile(false);
  }
  if(showProfile) return <Profile onBack={onBack} darkMode={darkMode}/>
  
  return (
    <>
      {/* Top bar */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} w-[30vw] flex flex-col gap-2`}>
        <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-background border-gray-200'} py-2 px-4 border-r flex justify-between items-center gap-2`}>
          <button onClick={() => setShowProfile(!showProfile)}>
            <img src={userData.photoURL} alt="" className='rounded-full h-6 w-6 border-2 border-primary' />
          </button>
          <div className='flex items-center space-x-6'>
            <button onClick={() => { setDarkMode(!darkMode); }}>
              <MoonStar className='text-primary' />
            </button>
            <button onClick={()=>{
              if(searchBarRef.current){
                searchBarRef.current?.focus();
              }
            }}><CircleFadingPlusIcon className="h-6 w-6 text-primary" /></button>
            <button onClick={()=>{
              setShowProfile(!showProfile);
            }}><UserRoundIcon className='h-6 w-6 text-primaryDark' /></button>
          </div>
        </div>
  
        {/* Search bar */}
        <div>
          <input ref={searchBarRef}
            type="text"
            className={`w-[96%] ml-[6px] px-4 py-2 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800 text-gray-300 placeholder-gray-400' : 'border-gray-300 bg-white text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm transition duration-200`}
            placeholder='Search a user....'
            value={searchUser}
            onChange={(e) => {
              setSearchUser(e.target.value);
            }}
          />
        </div>
  
        {/* Chat list */}
        {isloading ? (
          <h1 className="text-primaryDark mt-4 ml-4">Loading.....</h1>
        ) : (
          <div className={`flex-1 overflow-y-auto flex flex-col gap-3 px-2 scrollbar-thin scrollbar-thumb-primary ${darkMode ? 'scrollbar-track-gray-700' : 'scrollbar-track-gray-200'}`}>
            {(filterArray.length === 0) ? (
              <div className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-500'} py-4 text-sm italic`}>
                no result found
              </div>
            ) : (
              filterArray.map(u => (
                <UserCard id={u.id} key={u.id} user={u.data} darkMode={darkMode}></UserCard>
              ))
            )}
          </div>
        )}
      </div>
    </>
  )
  
  
}

export default ChatPanel