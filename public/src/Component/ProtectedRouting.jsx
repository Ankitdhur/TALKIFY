import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Loader2Icon } from "lucide-react";

function ProtectedRouting({children}) {
  const {userData,loading}=useAuth();
  if(loading){
    return(<div className="h-screen w-screen flex justify-center items-center bg-[#eff2f5]">
      <Loader2Icon className="w-8 h-8 animate-spin "/>
    </div>)
    
  }
  if (userData) {
    return children
}
else {
  return <Navigate to="/login" ></Navigate>
  }
}
export default ProtectedRouting;