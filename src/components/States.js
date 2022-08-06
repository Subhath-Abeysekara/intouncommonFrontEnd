import React, { useEffect, useState } from "react";

function States(){

    const[state_type,setState_type] = useState('')
    const[repayColor,setRepay] = useState('green')
    const[changeColor,setChange] = useState('green')
    const[warrantyColor,setWarranty] = useState('green')
    const[discountColor,setDiscount] = useState('green')
    const[stateId,setStateId]=useState(0)
    const[valid,setValid]=useState(false)
    const[statecode,setStatecode] = useState([])

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

    const addSateCode=(e)=>{
        const statecode ={repayColor,changeColor,warrantyColor,discountColor}
        console.log(statecode)
        alert(repayColor)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/states/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":releaseToken(localStorage.getItem("user"))},
            body:JSON.stringify(statecode)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="/"
            }
          else{
            window.location="/state"
          }
          })
        }

        const deleteStateCode=(e)=>{
          fetch("https://into-uncommon.herokuapp.com/intouncommon/states/delete?id="+stateId,{
            method:"DELETE",
            headers:{"header":releaseToken(localStorage.getItem("user"))}
          })
          .then(res=>res.json())
          .then((result)=>{
            var error = ""
            console.log(error)
        if(result==error){
          window.location="/"
        }
      else{
        window.location="/state"
      }        
    })
        }

        function showStates(){
          console.log(localStorage.getItem("user"))
          fetch("https://into-uncommon.herokuapp.com/intouncommon/getstates",{
            headers:{"header":releaseToken(localStorage.getItem("user"))}
          })
          .then(res=>res.json())
          .then((result)=>{
          var string="<h3 style='color:red;'>Available StateCodes</h3><ul>"
          var frame = document.getElementById("showing")
          var i =0
          for(i=0;i<result.length;i++){
            string+="<li><p>ID : "+result[i].stateId+"<br></br>Repay : "+result[i].repayColor+"<br></br>Change : "+result[i].changeColor+"<br></br>Warranty : "+result[i].warrantyColor+"<br></br>Discount : "+result[i].discountColor+"</p></li>"
        }
        string+="</ul>"
        console.log(string)
        frame.innerHTML = string
             
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
        {valid? <div>
           <div class="links" style={{textAlign:"left"}}>
          <a href="/category"><p style={{color: "green"}}><b>BACK</b></p></a>
          </div>
          <div style={{textAlign:"left" , top:0}}>
            <button onClick={showStates}>SHOW STATECODES</button>
           </div>
            <div id="adding" style={{textAlign:"center"}}>
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>State Codes</u></h1>
              <h3 style={{color: "red"}}>Add State</h3>
              
            <form>
            <label htmlFor="repayColor"><b>Choose repayColor</b></label>

<select name="repayColor" id="repayColor"
value={repayColor}
onChange={(e)=>setRepay(e.target.value)}>
  <option value="green">Green</option>
  <option value="red">Red</option>
</select><br></br>
<label htmlFor="changeColor"><b>Choose changeColor</b></label>

<select name="changeColor" id="changeColor"
value={changeColor}
onChange={(e)=>setChange(e.target.value)}>
  <option value="green">Green</option>
  <option value="red">Red</option>
</select><br></br>

<label htmlFor="warrantyColor"><b>Choose A repayColor</b></label>

<select name="warrantyColor" id="warrantyColor"
value={warrantyColor}
onChange={(e)=>setWarranty(e.target.value)}>
  <option value="green">Green</option>
  <option value="red">Red</option>
</select><br></br>

<label htmlFor="warrantyColor"><b>Choose A repayColor</b></label>

<select name="discountColor" id="discountColor"
value={discountColor}
onChange={(e)=>setDiscount(e.target.value)}>
  <option value="green">Green</option>
  <option value="red">Red</option>
</select><br></br>
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
        </div>:<div><h2>Log In First</h2></div>}
       </div>
    )
}

export default States;