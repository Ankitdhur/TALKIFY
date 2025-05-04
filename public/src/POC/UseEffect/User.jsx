import React, { useEffect } from 'react'

function User() {
    const [loading ,setloading]=React.useState(true)
    const [user ,setuser]=React.useState({})
    //call after first render
    function cb(){
        setloading(false)
        setuser({name:"John",age:30})
    }
    useEffect(cb,[])
    if(loading)
  return (
    <div>...Loading</div>
  )
  else{
    return (
        <div>
            <h1>{user.name}</h1>
            <p>Age: {user.age}</p>
        </div>
        )
  }
}

export default User