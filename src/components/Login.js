import React, { useState , useEffect} from "react";


function Login(){

    const[username,setUsername] = useState('')
  const[password,setPassword] = useState('')
  const handleClick=(e)=>{
    e.preventDefault()
    const admin ={username,password}
    var position = document.getElementById("id1")
   // console.log(student)
    fetch("https://into-uncommon.herokuapp.com/intouncommon/getKey",{
      method:"POST",
      headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
      body:JSON.stringify(admin)
    })
    .then(res=>res.text())
    .then((result)=>{
      console.log(result)
      var error = "Error username or password"
      if(error==result){
        position.innerHTML = result
        alert(result)
      }
      else{
        localStorage.setItem("user",result)
        window.location="/category"
      }
    })
  }
  useEffect(()=>{
    fetch("https://into-uncommon.herokuapp.com/intouncommon/get/category/ids?common=true",{
      headers:{"header":"subhath"}
    })
    .then(res=>res.text())
    .then((result)=>{
      console.log(result[0])
    })
  },[])

    return(
        <div class="frame" style={{textAlign:"center"}}>
            <form>
                <input label="Username" varient="Outlined" fullWidth
    value={username}
    onChange={(e)=>setUsername(e.target.value)}>
                </input><br></br>
                <input label="Password" varient="Outlined" fullWidth type={"password"}
    value={password}
    onChange={(e)=>setPassword(e.target.value)}>
                </input>
            </form>
            <button variant='contained' color = "secondary" onClick={handleClick}>Submit</button>
            <p id="id1" style={{color:"red"}}></p>
        </div>
        
    );
}

export default Login;