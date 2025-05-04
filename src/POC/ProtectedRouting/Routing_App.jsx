import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from "./Login"
import Home from "./Home"
import Chat from './Chat'
import ProtectedRouting from '../../Component/ProtectedRouting'

function Routing_App() {
  const [isLogin, setIsLogin] = React.useState(false)
  return (<>
    <Routes>
      <Route path="/" element={<ProtectedRouting isLogin={isLogin} ><Home setIsLogin={setIsLogin}></Home></ProtectedRouting> }/>
      <Route path="/chat/:uniqueId" element={<ProtectedRouting isLogin={isLogin} ><Chat></Chat></ProtectedRouting>} />
      <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
      <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}
// function PRouting(props) {
//   const isLogin=props.isLogin;
//   const setIsLogin=props.setIsLogin;
//   if (!isLogin) {
//     return <Login setIsLogin={setIsLogin} />
//     }
//     else {
//       return <Navigate to="/" ></Navigate>
//       }
//     }

export default Routing_App