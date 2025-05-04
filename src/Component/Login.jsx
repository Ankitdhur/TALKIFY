import React from 'react'
import { Fingerprint, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
//Step-3 for auth and db
import { auth ,DB } from '../../firebase';
import { setDoc,doc} from 'firebase/firestore';


async function createUser(authData){
  const userObject=authData.user;
  // const uId=userObject.uid;
  // const photoURL=userObject.photoURL;
  // const name=userObject.displayName;
  // const email=userObject.email;
  const {uid ,photoURL,displayName,email}=userObject;
  const date=new Date();
    const timeStamp=date.toLocaleString("en-US",{
      hour:"numeric",
      minute:"numeric",
      hours12:true,
    })
  await setDoc(doc(DB,"users",uid),{
    email,
    photoURL,
    name: displayName,
    lastseen: timeStamp
  }
)
}

export default function Login() {
  // All the function of setuserData handle by onAuthStateChanged function in AUTHCONTEXT.JSX
  // const {userData,setUserData } = useAuth();// ✅ hook at top level
  const navigate = useNavigate();
  // // if(userData){
  // //     navigate("/")
  // //     return
  // //   }
      const handleLogin=async ()=>{
          // Login logic here 
          //auth-Step-4
          const authData=await signInWithPopup(auth,new GoogleAuthProvider());
          await createUser(authData);
          // const {  photoURL, displayName,email } = authData.user;
          // console.log(photoURL)
          // setUserData({
          //   email,
          //   photoURL,
          //   name: displayName,
          // });
          navigate('/')
      }
      return (
        <>
          {/* Top Header */}
          <div className='bg-primary h-[220px]'>
            <div className='flex justify-center sm:justify-start sm:ml-[200px] pt-[40px] items-center gap-2'>
              <img 
                src="/TalkifyLogo.png" 
                className='h-12 mt-1' 
                alt="Talkify logo" 
              />
              <div className='text-white font-bold text-2xl tracking-wide'>TALKIFY</div>
            </div>
          </div>
      
          {/* Main Content */}
          <div className='bg-background min-h-[calc(100vh-220px)] flex justify-center items-center relative px-4'>
            <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6 items-center justify-center absolute top-[-93px]'>
              <Fingerprint className='text-primaryDark h-20 w-20' strokeWidth={1} />
      
              <div className='font-bold text-2xl text-grayDark'>Sign In</div>
      
              <div className='text-sm text-grayLight text-center px-2'>
                Sign in with your Google account to get started
              </div>
      
              <button 
                className='bg-primary hover:bg-primaryDark transition-all duration-200 flex gap-2 items-center px-6 py-3 text-white rounded-md text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryDark'
                onClick={handleLogin}
              >
                <span>Sign in with Google</span>
                <LogIn className='h-5 w-5' />
              </button>
            </div>
          </div>
        </>
      )
}
