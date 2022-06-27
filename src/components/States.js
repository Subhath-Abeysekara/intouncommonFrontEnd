import React, { useEffect, useState } from "react";

function States(){

    const[state_type,setState_type] = useState('')
    const[stateId,setStateId]=useState(0)
    const[statecode,setStatecode] = useState([])
    const addSateCode=(e)=>{
        const statecode ={state_type}
        console.log(statecode)
        fetch("http://localhost:8080/intouncommon/states/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
            body:JSON.stringify(statecode)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="http://localhost:3000"
            }
          else{
            window.location="http://localhost:3000/state"
          }
          })
        }

        const deleteStateCode=(e)=>{
          fetch("http://localhost:8080/intouncommon/states/delete?id="+stateId,{
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
        window.location="http://localhost:3000/state"
      }        
    })
        }
    useEffect(()=>{
        console.log(localStorage.getItem("user"))
        fetch("http://localhost:8080/intouncommon/getstates",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
        var string="<h3 style='color:red;'>Available StateCodes</h3><ul>"
        var frame = document.getElementById("showing")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].stateId+"<br></br>StateType : "+result[i].state_type+"</p></li>"
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
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>State Codes</u></h1>
              <h3 style={{color: "red"}}>Add State</h3>
              
            <form>
            <label style={{color: "blue"}}>State Type</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="StateCode"
    value={state_type}
    onChange={(e)=>setState_type(e.target.value)}>
                </input><br></br>
            </form>
    <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addSateCode}>Submit</button>
            </div>
            <div class="deleting"  style={{textAlign:"center"}}>
            <h3 style={{color: "red"}}>Delete State</h3>
              <form>
                
                <input label="state id" varient="Outlined" fullWidth type="text" placeholder="State ID"
                value={stateId}
                onChange={(e)=>setStateId(e.target.value)}>
                </input><br></br>
                <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={deleteStateCode}>Delete</button>
              </form>
            </div>
            <div class="shawing" id="showing" style={{textAlign:"left"}}>
            
            </div>
        </div>
    )
}

export default States;