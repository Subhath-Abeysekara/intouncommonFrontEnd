import React, { useState , useEffect} from "react";


function Login(){

    const[username,setUsername] = useState('')
  const[password,setPassword] = useState('')
  const[login , setLogin] = useState(false)
  const[ip , setIp] = useState("")

  function tokenChange(token){

    var key = "qwerty"
    return token+key
   }

   function getMac(){

    fetch("https://api.ipify.org?format=json?callback=?",{
      method:"GET",
      headers:{},
    })
    .then(res=>res.text())
    .then((result)=>{
      setIp(result)
      alert(JSON.stringify(result))
    })

    

   }
  const handleClick=(e)=>{
    e.preventDefault()
    const admin ={username,password}
    var position = document.getElementById("id1")
   // console.log(student)
    fetch("https://into-uncommon.herokuapp.com/intouncommon/getKey?ip="+ip,{
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
        if(localStorage.getItem("count")==null){
          localStorage.setItem("count",1)

        }
        else{    
              var count = parseInt(localStorage.getItem("count"))
              count++
              localStorage.setItem("count",count)
              if(count>=3){
                localStorage.removeItem("count")
                fetch("https://into-uncommon.herokuapp.com/intouncommon/setLogin/status?ip="+ip,{
      method:"PUT",
      headers:{},
    })
    .then(res=>res.text)
    .then((result)=>{
      console.log(result)
      alert("your pc is blocked for 20 minuts , pc_ip : "+ip)
      setLogin(false)
    })
              }
      }
      }
      else{
        console.log(result)
        console.log(tokenChange(result))
        localStorage.setItem("user",tokenChange(result))
        localStorage.removeItem("count")
        window.location="/category"
      }
    })
  }
  useEffect(()=>{

    fetch("https://api.ipify.org?format=json?callback=?",{
      method:"GET",
      headers:{},
    })
    .then(res=>res.text())
    .then((result1)=>{
      setIp(JSON.stringify(result1))
      //alert("ip "+JSON.stringify(result1))
      fetch("https://into-uncommon.herokuapp.com/intouncommon/getLogin/status?ip="+JSON.stringify(result1),{
        headers:{"header":"subhath"}
      })
      .then(res=>res.text())
      .then((result)=>{
        console.log("status",result)
        if(result==="true"){
          setLogin(true)
        }
      })
    })
   
  },[])

    return(
        <div>
          {
            login?<div>
<div class="frameLogin" style={{textAlign:"center"}}>
            <form>
                <input label="Username" varient="Outlined" fullWidth placeholder="username"
    value={username}
    onChange={(e)=>setUsername(e.target.value)}>
                </input><br></br>
                <input label="Password" varient="Outlined" fullWidth type={"password"} placeholder="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}>
                </input>
            </form>
            <button variant='contained' color = "secondary" onClick={handleClick}>Log In</button>
            <p id="id1" style={{color:"red"}}></p>
        </div>
            </div>:<div>
            <h2 style={{color: "rgb(109, 108, 108)" , fontSize:"2vw"}}>Cant Log Now</h2>
                <p style={{color: "rgb(109, 108, 108)" , fontSize:"0.8vw"}}>Try Again Shortly</p>
            </div>
          }
        </div>
        
    );
}

export default Login;