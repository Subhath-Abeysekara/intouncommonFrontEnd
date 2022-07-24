import React, { useEffect, useState } from "react";
import axios from "axios";


function AccountManage(){

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[oldUsername,setOldUsername] = useState('')
    const[oldPassword,setOldPassword] = useState('')
    const[oldadmin,setOldadmin] = useState('')
    const[admin,setadmin] = useState('')
    const[valid,setValid]=useState(false)
    const addAdmin=(e)=>{
        const admin ={username,password}
     // console.log(student)
      fetch("https://into-uncommon.herokuapp.com/intouncommon/addAdmin",{
        method:"POST",
        headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
        body:JSON.stringify(admin)
      })
      .then(res=>res.text())
      .then((result)=>{
        console.log(result)
        var error = "Error username or password"
        if(error==result){
            window.location="/"
        }
        else{
            alert(result)
          window.location="/accountManage"
         
        }
      })
    }

    const changeAdmin=(e)=>{
        const oldadmin ={username,password,oldUsername,oldPassword}

        fetch("https://into-uncommon.herokuapp.com/intouncommon/changeAdmin",{
        method:"PUT",
        headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
        body:JSON.stringify(oldadmin)
      })
      .then(res=>res.text())
      .then((result)=>{
        console.log(result)
        var position = document.getElementById("id1")
        var error = "Error username or password"
        if(error==result){
            position.innerHTML = error
        }
        else{
          alert("successfully changed")
          window.location="/login"
        }
      })
    }
    useEffect(()=>{
      if(!valid){
        console.log(valid)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getvalidity",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.text())
        .then((result)=>{
          console.log(result)
          if(result==="successful"){
            setValid(true)
          }
        })
      }
        if(localStorage.getItem("key")==null){
            window.location="/"
        }
        else{
            localStorage.removeItem("key")
        }
      },[])

    return(
        <div>
          {valid?<div class="frame">
            <div class="add">
            <h1>Add New Admin</h1>
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
            <button variant='contained' color = "secondary" onClick={addAdmin}>Submit</button>
            </div>
            <div class="change">
            <h1>Change Admin</h1>
            <form>
                <label>Current Username</label><br></br>
            <input label="OldUsername" varient="Outlined" fullWidth
    value={oldUsername}
    onChange={(e)=>setOldUsername(e.target.value)}>
                </input><br></br>
                <label>new Username</label><br></br>
                <input label="Username" varient="Outlined" fullWidth
    value={username}
    onChange={(e)=>setUsername(e.target.value)}>
                </input><br></br>
                <label>Old Password</label><br></br>
                <input label="OldPassword" varient="Outlined" fullWidth
    value={oldPassword}
    onChange={(e)=>setOldPassword(e.target.value)}>
                </input><br></br>
                <label>new Password</label><br></br>
                <input label="Password" varient="Outlined" fullWidth
    value={password}
    onChange={(e)=>setPassword(e.target.value)}>
                </input>
            </form>
            <button variant='contained' color = "secondary" onClick={changeAdmin}>Submit</button>
            <p id="id1"></p>
            </div>
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default AccountManage;