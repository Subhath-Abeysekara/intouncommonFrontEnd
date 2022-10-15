import React, { useEffect } from "react";
import { useState } from "react";
import './Search.css'


function PendingProducers(){

    const[contact,setContact] = useState("")
    const[id , setId] = useState(0)
    const[address , setAddress] = useState("")
    const[name , setName] = useState("")
    const[pendingProducer , setPendingProducer] = useState({})
    const[showProducer , setShow] = useState(false)
    const[valid,setValid]=useState(false)
    const[accept , setAccept] = useState(true)


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

      const confirm=(pContact)=>{
        alert("confirm "+pContact)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/confirmPending/"+pContact,{
            method:"PUT",
            headers:{"header":releaseToken(localStorage.getItem("user"))},
           // body : JSON.stringify(pendingProducers)
          })
          .then(res=>res.text())
          .then((result)=>{
            alert(result)
          })
      }

      const reject=(pId)=>{
        alert("jeject "+pId)
      }

    function search(){
        console.log(contact)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getPendingProducer/"+contact,{
            headers:{"header":releaseToken(localStorage.getItem("user"))},
           // body : JSON.stringify(pendingProducers)
          })
          .then(res=>res.json())
          .then((result2)=>{
            alert(result2)
            console.log(result2)
            if(result2!=null){
                setPendingProducer(result2)
            setShow(true)
            }
          })
    }

    const deleteFile=(e)=>{
        alert(id)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/deletePendingProduct/"+id,{
            method:"DELETE",
            headers:{"header":releaseToken(localStorage.getItem("user"))},
           // body : JSON.stringify(pendingProducers)
          })
          .then(res=>res.text())
          .then((result)=>{
            alert(result)
           // search
           fetch("https://into-uncommon.herokuapp.com/intouncommon/getPendingProducer/"+contact,{
            headers:{"header":releaseToken(localStorage.getItem("user"))},
           // body : JSON.stringify(pendingProducers)
          })
          .then(res=>res.json())
          .then((result2)=>{
            alert(result2)
            if(result2!=null){
                setPendingProducer(result2)
                if(result2.adminStatus==="qualified"){
                  setAccept(false)
                }
            setShow(true)
            setId(0)
            }
          })
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
        
   
    } , [])
    return(
       <div>
        {valid? <div>
             <label  className="lableS searchLable">Search Producer</label><br></br>
                <input placeholder="Enter CSontact " className="inputS inputsearch"
                value={contact}
                onChange={(e)=>setContact(e.target.value)}></input><br></br>
                <button onClick={search} className="search">SEARCH</button>
                <div>
                    {showProducer&&<div>
                        <p style={{position:"absolute",top:"12%"}}>Name - {pendingProducer.name}</p>
                        <p style={{position:"absolute",top:"16%"}}>Address - {pendingProducer.address}</p>
                        <p style={{position:"absolute",top:"20%"}}>Contact - {pendingProducer.contact}</p>
                        <p style={{position:"absolute",top:"24%"}}>Email - {pendingProducer.email}</p>
                        <p style={{position:"absolute",top:"28%"}}>AdminStatus - {pendingProducer.adminStatus}</p>
                        <div style={{position:"absolute",top:"39%"}}>
                        {pendingProducer.pendingProducts.map((product,index)=>(<a href={product.url} >
            <input type="button" value={"file"+index+"/ID - "+product.id} ></input>
            <br></br>
            
        </a>))}
        <div>
          {pendingProducer.adminStatus!="qualified"&&<div><button onClick={()=>confirm(pendingProducer.contact)}>Accept</button></div>}
        </div>
                        </div>
                        <input placeholder="Enter File Id " className="inputS fileId"
                value={id}
                onChange={(e)=>setId(e.target.value)}></input><br></br>
                <button onClick={deleteFile} className="delete">DELETE</button>
                        </div>}
                </div>
        </div>:<div><h2>Log In First</h2></div>}
       </div>
    )

}

export default PendingProducers;