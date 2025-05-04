import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import image from './defaultimage.jpg';

function UserCard({ user, id, darkMode }) {
  const { userData } = useAuth();
  const isCurrentUser = userData.id === id;
  console.log(user.photoURL);
  

  return (
    <Link
      to={`/${id}`}
      className={`flex gap-3 items-center p-2 rounded-lg border-2 transition focus:outline-none focus:ring-2 ${darkMode ? 
        'bg-gray-800 border-gray-700 hover:border-primary hover:bg-gray-700 focus:ring-primaryDark' :
        'bg-white border-background hover:border-primary hover:bg-background focus:ring-primaryDark'
      }`}
    >
      <img 
        src={user.photoURL || image} 
        alt="userPhoto" 
        className='rounded-full h-10 w-10 border-2 border-primary'
      />
      <h2 className={`font-medium ${isCurrentUser ? 'text-primaryDark' : (darkMode ? 'text-gray-300' : 'text-grayDark')}`}>
        {isCurrentUser ? user?.name + " (You)" : user?.name}
      </h2>
    </Link>
  )
}

export default UserCard;
