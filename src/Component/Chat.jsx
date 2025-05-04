import React, { useEffect, useState,useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MessageSquareText, PlusIcon, SendIcon, Trash2 } from 'lucide-react'
import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { DB } from '../../firebase'
import { useAuth } from './AuthContext';

function Chat({darkMode}) {
  const {userData}=useAuth();
  const params = useParams()//return object
  const [msg,setMsg]=useState("");
  const [secondUser,setSecondUser]=useState();
  const [msgList , setMsgList]=useState([]);
  const receiverId=params.chatId
  const[showDeleteConfirm,setShowDeleteConfirm]=useState(false);
  const DeleteMsgRef=useRef(null);
  const msgEndRef=useRef(null);//useRef is a React hook that helps us access a DOM element directly.
// It's like giving a "reference" to an HTML element in your React component.

//it is used to generate unique chatId betweem two user based to two id
const chatId = userData?.id && receiverId
  ? (userData.id > receiverId 
      ? `${userData.id}-${receiverId}` 
      : `${receiverId}-${userData.id}`)
  : null;

  useEffect(() => {
    if (msgEndRef.current) //is reference is there or it is null
      {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgList]);
  
useEffect(() => {
  if (!chatId) return;
  // 1. Real-time user data listener
  const userUnsubscribe = onSnapshot(doc(DB, "users", receiverId), (doc) => {
    setSecondUser(doc.data());
  });

  // 2. Real-time messages listener
  const msgUnsubscribe = onSnapshot(doc(DB, "user-chats", chatId), (doc) => {
    setMsgList(doc.data()?.messages || []);
  });

  // Single cleanup function for both listeners
  return () => {
    userUnsubscribe(); // ✅ Correctly removes user listener
    msgUnsubscribe(); // ✅ Correctly removes messages listener
  };
}, [receiverId,chatId]); // ✅ Add `chatId` to dependencies //it will run whenver we get the receiver
//  ID Once when the component first mounts and receiverId has a value.
//Again every time receiverId changes.
//Mounting means=>when your component is added to the DOM for the first time.

const handleDelete=async ()=>{
  await updateDoc(doc(DB, "user-chats", chatId), {
    chatId: chatId,
    messages: []
  })
}


const handleSendMsg=async ()=>{
  if(msg){
    const date=new Date();
    const timeStamp=date.toLocaleString("en-US",{
      hour:"numeric",
      minute:"numeric",
      hours12:true,
    });

    //start chat with user
    if(msgList?.length==0){
      await setDoc(doc(DB, "user-chats", chatId), {
        chatId: chatId,
        messages: [
          {
            text: msg,
            time: timeStamp,
            sender: userData.id,
            receiver: receiverId,
          },
        ],
      });
    } else {
      // update in the message list
      await updateDoc(doc(DB, "user-chats", chatId), {
        chatId: chatId,
        // arrayUnion is used here to append to last message to the array list.
        messages: arrayUnion({
          text: msg,
          time: timeStamp,
          sender: userData.id,
          receiver: receiverId,
        }),
      });
    }
  setMsg("");
  }
}

  //Empty Screen
  if (!receiverId) {
    return (
      <section className={`w-[70%] h-full flex flex-col gap-4 items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-400'}`}>
        <MessageSquareText
          className={`w-28 h-28 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}
          strokeWidth={1.2}
        />
        <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
          select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    );
  }
  





//   return (
//     <>
//     <div>
//       <div>Top Bar</div>
//       {secondUserLoading==true ? <div>...Loading</div> : <div>User Present</div>}
//     </div>
//     </>
//   )
// if (secondUserLoading) {
//   return <div>...Loading</div>;
// }

// if (!secondUser) {
//   return <div>Error loading user.</div>; // Fallback just in case
// }

return (
  <section className={`w-[70%] h-full flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-background'}`}>

    <div className={`h-full w-full flex flex-col rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Top bar */}
      <div className={`px-4 py-2 flex items-center gap-2 shadow-sm border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} justify-between`}>
        <div className='flex gap-2'>
          <img 
            src={secondUser?.photoURL} 
            alt="profilepicture" 
            className={`h-9 w-9 rounded-full object-cover border-2 ${darkMode ? 'border-gray-500' : 'border-primary'}`} 
          />
          <div className='flex flex-col'>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-grayDark'}`}>
              {(receiverId === userData.id) ? secondUser?.name + "(You)" : secondUser?.name}
            </h3>
            {secondUser?.lastseen && (
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-400'}`}>last seen at: {secondUser.lastseen}</p>
            )}
          </div>
        </div>
        <button   onClick={() => {
    if (msgList.length > 0) {
      setShowDeleteConfirm(true);
    // Scroll to Top when delete confirm is about to open
      if (msgEndRef.current) {
        msgEndRef.current.parentNode.scrollTop = 0; // 👈 scroll to top
      }
    }}}>
          <Trash2 className={darkMode ? 'text-white' : 'text-primaryDark'} />
        </button>
      </div>

      <div className={`flex-grow flex flex-col gap-12 p-6 ${showDeleteConfirm ? 'overflow-hidden' :  'overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'} relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

  {/* Delete Confirmation Modal */}
  {showDeleteConfirm && (
    <>
      {/* for blury background */}
      <div ref={DeleteMsgRef} className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-2xl z-40"></div>

      {/* div for delete confirmation*/}
      <div className="absolute top-[150px] left-[216px]  p-6 rounded-xl shadow-lg flex flex-col items-center gap-4 z-50
      bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
        <h2 className="text-lg font-semibold text-center">
          Are you sure you want to delete this chat?
          <br />
          This action will permanently delete the chat from both sides.
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              handleDelete();
              setShowDeleteConfirm(false);
            }}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primaryDark"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )}

  {/* Message List */}
  {msgList?.map((m, index) => (
    <div
      key={index}
      data-sender={m.sender === userData.id}
      className={`
        w-fit rounded-md p-2 shadow-sm max-w-2xl break-words
        ${m.sender === userData.id 
          ? (darkMode ? 'ml-auto bg-primary text-white' : 'ml-auto bg-primary text-white') 
          : (darkMode ? 'bg-gray-700 text-white' : 'bg-background text-grayDark')}
      `}
    >
      <p>{m?.text}</p>
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-grayLight'} text-end`}>
        {m?.time}
      </p>
    </div>
  ))}
  
  {/* invisible div for scrolling */}
  <div ref={msgEndRef} />
</div>


      {/* Chat input */}
      <div className={`py-3 px-6 flex items-center shadow gap-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} ${darkMode ? 'bg-gray-800' : 'bg-background'}`}>
        <PlusIcon className={darkMode ? 'text-gray-400' : 'text-primaryDark'} />
        <input
          type="text"
          className={`w-full py-2 px-4 rounded focus:outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-grayDark border-gray-200'}`}
          placeholder="Type a message...."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMsg();
          }}
        />
        <button onClick={handleSendMsg}>
          <SendIcon className={darkMode ? 'text-gray-400' : 'text-primaryDark'} />
        </button>
      </div>
    </div>
  </section>
);

}

export default Chat