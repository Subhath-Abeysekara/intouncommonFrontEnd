import React, { useEffect, useState } from "react";

function User(){

    const[name,setName] = useState(localStorage.getItem("name"))
    const[email,setEmail] = useState(localStorage.getItem("email"))
    const[password,setPassword] = useState(localStorage.getItem("password"))
    const[contact,setContact] = useState(localStorage.getItem("contact"))
    const[userId,setUserId]=useState(localStorage.getItem("userId"))
    const[user,setUser] = useState([])
    const addUser=(e)=>{
        const user ={name,email,password,contact}
        console.log(user)
        fetch("http://localhost:8080/intouncommon/user/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
            body:JSON.stringify(user)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="http://localhost:3000"
            }
          else{
            window.location="http://localhost:3000/user"
          }
          })
        }

        const deleteUser=(e)=>{
          if(localStorage.getItem("updateCondition")=="yes"){
            localStorage.removeItem("userId")
              localStorage.removeItem("name")
              localStorage.removeItem("password")
              localStorage.removeItem("email")
              localStorage.removeItem("contact")
              localStorage.removeItem("updateCondition")
              alert("cant delete u have given update id")
              window.location="http://localhost:3000/user"
          }
          else{
            fetch("http://localhost:8080/intouncommon/user/delete?id="+userId,{
            method:"DELETE",
            headers:{"header":localStorage.getItem("user")}
          })
          .then(res=>res.json())
          .then((result)=>{
            var error = ""
            console.log(error)
        if(result==error){
          window.location="http://localhost:3000"
        }
      else{
        window.location="http://localhost:3000/user"
      }        
    })
          }
        }

        const updateUser=(e)=>{
          fetch("http://localhost:8080/intouncommon/getusers",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          setUser(result)
        var i =0
        console.log("user Id : "+userId)
        localStorage.removeItem("userId")
        localStorage.setItem("userId",userId)
        localStorage.setItem("updateCondition","yes")
        for(i=0;i<result.length;i++){
          if(result[i].userId == userId){
            localStorage.setItem("name",result[i].name)
            localStorage.setItem("email",result[i].email)
            localStorage.setItem("contact",result[i].contact)
            localStorage.setItem("password",result[i].password)
            break
          }
      }
           
  })
        }

        const changeUser=(e)=>{
          const user ={userId,name,email,password,contact}
          console.log("change user")
          console.log(user)
          if(localStorage.getItem("updateCondition")=="yes"){
            localStorage.removeItem("updateCondition")
            fetch("http://localhost:8080/intouncommon/user/update?id="+localStorage.getItem("userId"),{
              method:"PUT",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
              body:JSON.stringify(user)
            })
            .then(res=>res.text())
            .then((result)=>{
              console.log(result)
              var error = "Error username or password"
              localStorage.removeItem("userId")
              localStorage.removeItem("name")
              localStorage.removeItem("password")
              localStorage.removeItem("email")
              localStorage.removeItem("contact")
              if(result==error){
                window.location="http://localhost:3000"
              }
            else{
              window.location="http://localhost:3000/user"
            }
            })
          }
          else{
            alert("cant update without id")
            window.location="http://localhost:3000/user"
          }
        }

    useEffect(()=>{
        console.log(localStorage.getItem("user"))
        fetch("http://localhost:8080/intouncommon/getusers",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          console.log("user Id : "+localStorage.getItem("userId"))
          console.log("user name : "+name)
        var string="<h3 style='color:red;'>Available Users</h3><ul>"
        var frame = document.getElementById("showing")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].userId+"<br></br>UserName : "+result[i].name+"<br></br>Email : "+result[i].email+"<br></br>Password:"+result[i].password+"<br></br>Contact:"+result[i].contact+"</p></li>"
      }
      string+="</ul>"
      console.log(string)
      frame.innerHTML = string
           
  })
      },[])

    return(
        <div>
          <div class="links" style={{textAlign:"left"}}>
          <a href="/category"><p style={{color: "green"}}><b>BACK</b></p></a>
          </div>
        <div id="adding" style={{textAlign:"center"}}>
       
          <h1 style={{textAlign:"center",color:"purple"}}><u>Users</u></h1>
          <h3 style={{color: "red"}}>Add User</h3>
          
        <form>
        <label style={{color: "blue"}}>User Name</label><br></br>
            <input label="name" varient="Outlined" fullWidth placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}>
            </input><br></br>

            <label style={{color: "blue"}}>User Email</label><br></br>
            <input label="email" varient="Outlined" fullWidth type="email" placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}>
            </input><br></br>

            <label style={{color: "blue"}}>Password</label><br></br>
            <input label="password" varient="Outlined" fullWidth type="password" placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}>
            </input><br></br>

            <label style={{color: "blue"}}>User Contact</label><br></br>
            <input label="contact" varient="Outlined" fullWidth placeholder="Contact"
value={contact}
onChange={(e)=>setContact(e.target.value)}>
            </input><br></br>
        </form>
<button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addUser}>Submit</button>
        </div>

        <div class="updating" style={{textAlign:"center"}}>
        <h3 style={{color: "red"}}>Update User</h3>
        <form>
            <input label="user id" varient="Outlined" fullWidth type="text" placeholder="User ID"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}>
            </input><br></br>
            <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={updateUser}>Update</button>
          </form>
          <h3 style={{color: "red"}}>Change User</h3>
          <form>
          <label style={{color: "blue"}}>User Name</label><br></br>
              <input label="name" varient="Outlined" fullWidth placeholder="Name"
  value={name}
  onChange={(e)=>setName(e.target.value)}>
              </input><br></br>
  
              <label style={{color: "blue"}}>User Email</label><br></br>
              <input label="email" varient="Outlined" fullWidth type="email" placeholder="Email"
  value={email}
  onChange={(e)=>setEmail(e.target.value)}>
              </input><br></br>
  
              <label style={{color: "blue"}}>Password</label><br></br>
              <input label="password" varient="Outlined" fullWidth type="password" placeholder="Password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}>
              </input><br></br>
  
              <label style={{color: "blue"}}>User Contact</label><br></br>
              <input label="contact" varient="Outlined" fullWidth placeholder="Contact"
  value={contact}
  onChange={(e)=>setContact(e.target.value)}>
              </input><br></br>
          </form>
  <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={changeUser}>Submit</button>
        </div>


        <div class="deleting"  style={{textAlign:"center"}}>
        <h3 style={{color: "red"}}>Remove User</h3>
          <form>
            
            <input label="user id" varient="Outlined" fullWidth type="text" placeholder="User ID"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}>
            </input><br></br>
            <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={deleteUser}>Delete</button>
          </form>
        </div>
        <div class="shawing" id="showing" >
        
        </div>
    </div>
    )
}

export default User;