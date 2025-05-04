import { createContext, useContext,useState,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth, DB} from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading,setLoading]=useState(true)
//     Keep your app in sync with the logged-in user's data.
// Automatically fetch and store the user's profile info from Firestore.
// Persist user login even after page refresh (which Firebase handles for you, and this effect updates the UI accordingly).
//After the page loads, listen to the login status. If someone is logged in, fetch their info and update the UI.”
// It only runs when something changes in the login state:
// 🔄 App first loads → it runs immediately and tells you if a user is already logged in or not.

// 🔐 User logs in → it runs and gives you the user info.

// 🚪 User logs out → it runs and gives you null.

// 🔄 Page refresh → it runs again (Firebase keeps the user logged in across sessions if set up).(it checked from firebase ki user login tha ya nhi)
//onAuthStateChanged() is a listener function provided by Firebase Auth.

// It watches for changes in the user's sign-in state — for example:

// When a user logs in ✅

// When a user logs out ❌

// When the app reloads and Firebase restores the session 🔁
// for some time it show login page and meanwhile it check user was login and then it set the user and re render and home page is open because user is present


    useEffect(()=>{
     const unsubscribe= onAuthStateChanged(auth, async (currentUser) => {
        if(currentUser){
          const docRef=doc(DB,"users",currentUser?.uid);
          const docSnap=await getDoc(docRef);
          if(docSnap.exists()){
            const timeStamp = new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            updateDoc(doc(DB, "users", currentUser?.uid), {
              lastseen: timeStamp
            });
            const {photoURL,name,email,lastseen}=docSnap.data();
            setUserData({ id:currentUser.uid,photoURL,name,email ,lastseen});
          }
        }
        setLoading(false)
    })
    return ()=>{
     unsubscribe();
    }
  },[])
    return (
        <AuthContext.Provider value={{userData,setUserData,loading}}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);

// const setUserLastSeen=async (currentUser)=>{
//   const date=new Date();
//     const timeStamp=date.toLocaleString("en-US",{
//       hour:"numeric",
//       minute:"numeric",
//       hours12:true,
// }
//     )
//   await updateDoc(doc(DB,"users",currentUser.id),{
//     lastseen: timeStamp
//   })
// }
