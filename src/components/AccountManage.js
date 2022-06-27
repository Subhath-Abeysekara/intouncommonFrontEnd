import React, { useEffect, useState } from "react";
import axios from "axios";


function AccountManage(){

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[oldUsername,setOldUsername] = useState('')
    const[oldPassword,setOldPassword] = useState('')
    const[oldadmin,setOldadmin] = useState('')
    const[admin,setadmin] = useState('')
    const addAdmin=(e)=>{
        const admin ={username,password}
     // console.log(student)
      fetch("http://localhost:8080/intouncommon/addAdmin",{
        method:"POST",
        headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
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
            alert(result)
          window.location="http://localhost:3000/accountManage"
         
        }
      })
    }

    const changeAdmin=(e)=>{
        const oldadmin ={username,password,oldUsername,oldPassword}

        fetch("http://localhost:8080/intouncommon/changeAdmin",{
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
          window.location="http://localhost:3000/login"
        }
      })
    }
    useEffect(()=>{
        if(localStorage.getItem("key")==null){
            window.location="http://localhost:3000"
        }
        else{
            localStorage.removeItem("key")
        }
      },[])

    return(
        <div class="frame">
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
        </div>
    )
}

export default AccountManage;