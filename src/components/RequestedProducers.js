import React, { useEffect, useState } from "react";



function RequestedProducers(){

    const[singleReq , setSingleReq] = useState(false)
    const[category , setCategory] = useState(false);
    const[showReq , setShowReq] = useState(false);
    const[producerCategories,setCategories]= useState([])
    const[requests,setRequests]= useState([])
    const[singleRequest , setSingleRequest] = useState({})
    const[commonCategory , setCommon] = useState([])
    const[uncommonCategory , setUncommon] = useState([])
    const[index , setIndex] = useState(0)
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

    function showRequests(){

        fetch("https://into-uncommon.herokuapp.com/intouncommon/getRequests",{
            headers:{"header":releaseToken(localStorage.getItem("user"))}
          })
          .then(res=>res.json())
          .then((result)=>{
            console.log("requests"+result)
            setRequests(result)
            setShowReq(true)
          })
    }

    function confirmProducer(rId){
        alert("confirm "+ rId)
        console.log(producerCategories)
        const producer = {producerCategories}
        fetch("https://into-uncommon.herokuapp.com/intouncommon/confirmRequest/"+rId,{
          method:"POST",
            headers:{"header":releaseToken(localStorage.getItem("user"))},
            body : JSON.stringify(producer)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log("result"+result)
            alert(result)
           // setRequests(result)
            
          })
    }

    function rejectProducer(rId){
        alert("reject "+rId)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/rejectRequest/"+rId,{
          method:"DELETE",
            headers:{"header":releaseToken(localStorage.getItem("user"))},
            
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log("result"+result)
            alert(result)
           // setRequests(result)
            
          })
    }
    function showCategories(){
      setCategory(true)
      alert(uncommonCategory)
      alert(commonCategory)
    }

    function selectCategory(catId){
        alert(catId)
        const object = {categoryId:catId}
        producerCategories.push(object)
    }
    function showSingle(index){
      alert(index)
      alert(requests[index].name)
      setSingleRequest(requests[index])
        setIndex(index)
        setSingleReq(true)
        setShowReq(false)
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
              fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          console.log("cats ",result)
            //setCategory(result)

            if(result !==null){

        var uncopy=[];
        var comcopy=[];
                  console.log(result)
        
                  var j=0;
                  var k=0
                  for(let i=0; i<result.length; i++){
                    if(result[i].common===false){
                        uncopy[j]=result[i]
                        j++
                    }
                    else{
                        comcopy[k]=result[i]
                        k++
                    }
                  }
                  
                  //console.log("com"+common)
                  setCommon(comcopy)
                  //setSizeCom(commonCategory.length * 6+20)
                  
                  console.log("uncom"+uncopy)
                  setUncommon(uncopy)
                  var sizz = uncopy.length*3+30
                  
                  
            }
        })
            }
          })
        }
          
        },[])

    return(
        <div>
            {valid?<div>
            {showReq?<div>
                {requests.map((request,index)=>(
                    <div className="request">
                        <p>name : {request.name}</p>
                        <p>contact : {request.contact}</p>
                        <p>whatsapp : {request.whatsApp}</p>
                        <p>email : {request.email}</p>
                        <p>address : {request.basicDetails}</p>
                        <p>nicNo : {request.nicNo}</p>
                        <button style={{color:"yellow" , background:"black"}} onClick={()=>showSingle(index)}>Select</button>
                    </div>
                ))}
            </div>:<div>
                {singleReq?<div>
                   
                    <div className="singleReq">
                    <p>name : {singleRequest.name}</p>
                        <p>contact : {singleRequest.contact}</p>
                        <p>whatsapp : {singleRequest.whatsapp}</p>
                        <p>email : {singleRequest.email}</p>
                        <p>address : {singleRequest.address}</p>
                        <p>nicNo : {singleRequest.nicNo}</p>
                        <img src={singleRequest.nicUrl1}></img>
                        <img src={singleRequest.nicUrl2}></img>
                        <button onClick={()=>rejectProducer(singleRequest.producerId)}>Reject Request</button>
                        <button onClick={showCategories}>AddCategory</button>
                        <div>
                        {category&&<div>
                            <p style={{color:"red"}}>Common Categories</p>
                            {commonCategory.map((category)=>(
                                 <div className="singlCat">
                                 <p>type : {category.type}</p>
                                 <p>contact : {category.material}</p>
                                 <button style={{color:"green" , background:"black"}} onClick={()=>selectCategory(category.categoryId)}>select</button>
                                 </div>
                            ))}
                            <p style={{color:"red"}}>UNcommon Categories</p>
                            {uncommonCategory.map((category2)=>(
                                 <div className="singlCat">
                                 <p>type : {category2.type}</p>
                                 <p>material : {category2.material}</p>
                                 <button style={{color:"green" , background:"black"}} onClick={()=>selectCategory(category2.categoryId)}>select</button>
                                 </div>
                            ))}
                            <button onClick={()=>confirmProducer(singleRequest.producerId)}>Confirm Request</button>
                            </div>}
                    </div>
                    </div>
               
                    
                </div>:<div>
                    <button onClick={showRequests}>Show Request</button>
                    </div>}
                </div>}
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default RequestedProducers