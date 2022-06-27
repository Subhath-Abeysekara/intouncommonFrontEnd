import React, { useState } from "react";


function Account(){

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const handleClick=(e)=>{
      e.preventDefault()
      const admin ={username,password}
     // console.log(student)
      fetch("http://localhost:8080/intouncommon/checkAdmin",{
        method:"POST",
        headers:{"header":localStorage.getItem("user")},
        body:JSON.stringify(admin)
      })
      .then(res=>res.text())
      .then((result)=>{
        console.log(result)
        var error = "Error username or password"
        if(error==result){
            window.location="http://localhost:3000"
        }
        else{
            localStorage.setItem("key","ok")
          window.location="http://localhost:3000/accountManage"
         
        }
      })
    }

    

    return(
        <div class="frame">
            <form>
                <input label="Username" varient="Outlined" fullWidth
    value={username}
    onChange={(e)=>setUsername(e.target.value)}>
                </input><br></br>
                <input label="Password" varient="Outlined" fullWidth
    value={password}
    onChange={(e)=>setPassword(e.target.value)}>
                </input>
            </form>
            <button variant='contained' color = "secondary" onClick={handleClick}>Submit</button>
            <p id="id1"></p>
        </div>
    )
}

export default Account;