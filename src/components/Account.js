import React, { useState , useEffect} from "react";


function Account(){

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[valid,setValid]=useState(false)

    function releaseToken(changedToken){

      var token = ""
      var key = "qwerty"
      for(var i =0; i<changedToken.length-6; i++){
        token+=changedToken[i]
      }
    console.log(token)
    //setToken(token)
    return token

    }

    const handleClick=(e)=>{
      e.preventDefault()
      const admin ={username,password}
     // console.log(student)
      fetch("https://into-uncommon.herokuapp.com/intouncommon/checkAdmin",{
        method:"POST",
        headers:{"header":releaseToken(localStorage.getItem("user"))},
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
            localStorage.setItem("key","ok")
          window.location="/accountManage"
         
        }
      })
    }

    useEffect(()=>{
      if(!valid){
        console.log(valid)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getvalidity",{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then(res=>res.text())
        .then((result)=>{
          console.log(result)
          if(result==="successful"){
            setValid(true)
          }
        })
      }
    },[])

    return(
        <div>
          {valid?<div class="frame">
        <form>
            <input label="Username" varient="Outlined" fullWidth
value={username}
onChange={(e)=>setUsername(e.target.value)}>
            </input><br></br>
            <input label="Password" varient="Outlined" fullWidth  type={"password"}
value={password}
onChange={(e)=>setPassword(e.target.value)}>
            </input>
        </form>
        <button variant='contained' color = "secondary" onClick={handleClick}>Submit</button>
        <p id="id1"></p>
    </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default Account;