import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import Chat from './Chat';

function HomePage() {
  const [darkMode, setDarkMode] = useState(false);


  return (
    <main className="h-screen w-full bg-grayDark">
      {/* Optional profile image upload */}
      {/* <input 
        type="file" 
        accept="image/png, image/jpeg, image/webp" 
        onChange={handleChange} 
      /> */}

      <div className="bg-background w-full h-full shadow-md flex">
        {/* Left Section: Chat Panel or User Profile */}
        {/* This includes chat list or current user's profile view */}
        <ChatPanel darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Right Section: Either empty chat screen or active chat */}
        <Chat darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </main>
  );
}

export default HomePage;
