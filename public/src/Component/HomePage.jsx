import React, { use, useState } from 'react'
import { storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ChatPanel from './ChatPanel';
import Chat from './Chat';

function HomePage() {
  const [darkMode,setDarkMode]=useState(false)
  // const handleChange = (event) => {
  //   const img =event.target.files[0];
  //   //STEP-3=>FS
  //   const storageRef=ref(storage,"/profile" + Math.random()) //where to store the file
  //   //STEP-4=>FS upload file
  //   const uploadTask=uploadBytesResumable(storageRef,img)
  //   //Step5=>FS 
  //   uploadTask.on('state_changed',progressCB,errorCB,finishedCB);
  //   //Monitor the upload(this function will be called whenever file is uploading)
  //   const progressCB = (snapshot) => {
  //     console.log(snapshot);  
  //   }
  //   //handle error(if error occured)
  //   const errorCB = (error) => {
  //     console.error('Upload failed:', error);
  //   }
  //   //handle successful upload(on success)
  //   const finishedCB = () => {
  //     console.log('Upload successful!');
  //     getDownloadURL(uploadTask.snapshot.ref).then(function (url){
  //       console.log('url', url);
  //     }
  //   )
  //   }
    
  //   }

  return (
    
    <main className='h-screen w-full bg-grayDark'>
      {/* profileChanging part
      <input type="file" accept='image/png image/jpeg image/webp' onChange={handleChange} /> */}
   
   <div className='bg-background w-full h-full shadow-md flex'>
    
    {/*1)  left part and it will be conditional means ya to chat list show krega ya fir Profile Details */}
    
    {/* 1.1) for chat list we have take all the users from the firestore database  */}
    {/* <div>Chat List or Panel</div> */}

    {/* 1.2.1) chat panel profile button click->then profile part should be open
    1.2.2) currently login user ka data */}
    {/* <div>Profile</div> */}
    <ChatPanel darkMode={darkMode} setDarkMode={setDarkMode}/>

    {/* right part and it will also conditional means ya to empty chat show krega ya fir Chat Details
    <div>empty chat</div>
    <div>Individual chat</div> */}
    <Chat darkMode={darkMode} setDarkMode={setDarkMode}/>
    </div>
    </main>
  )
}

export default HomePage