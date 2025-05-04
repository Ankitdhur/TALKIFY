import Login from "./Component/Login"
import { Route,Routes } from "react-router-dom"
import Chat from "./Component/Chat"
import HomePage from "./Component/HomePage"
import PageNotFound from "./Component/PageNotFound"
import ProtectedRouting from "./Component/ProtectedRouting"
import React from "react";


function App() {
  return (<>
    <Routes>
      <Route path="/" element={<ProtectedRouting><HomePage></HomePage></ProtectedRouting> }/>
      <Route path="/:chatId" element={<ProtectedRouting><HomePage></HomePage></ProtectedRouting>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
