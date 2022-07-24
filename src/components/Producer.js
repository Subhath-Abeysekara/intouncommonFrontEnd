import React, { useEffect, useState } from "react";

function Producer(){


    const[name,setName] = useState(localStorage.getItem("name"))
    const[basicDetails,setBasicDetails] = useState(localStorage.getItem("basic"))
    const[nicNo,setNicNo] = useState(localStorage.getItem("nic"))
    const[producerId,setProducerId]=useState(localStorage.getItem("producerId"))
    const[catId,setCatId] = useState(localStorage.getItem("catId"))
    const[catCount,setCatCount] = useState(localStorage.getItem("catcount"))
    const[producerCategories,setProducerCategories]=useState(JSON.parse(localStorage.getItem("categories")))
    const[producer,setProducer] = useState([])
    const[valid,setValid]=useState(false)

    const addProducer=(e)=>{
      if(localStorage.getItem("catcount")==null){
        alert("You should enter the category Count first")
        window.location="/producer"
      }
      else{
        if(localStorage.getItem("presentCount")>localStorage.getItem("catcount")){
          //clear all relevent localstorages
          localStorage.removeItem("name")
          localStorage.removeItem("nic")
          localStorage.removeItem("basic")
          localStorage.removeItem("catcount")
          localStorage.removeItem("catId")
          localStorage.removeItem("categories")
          localStorage.removeItem("presentCount")

          const producer = {name,basicDetails,nicNo,producerCategories}
        console.log(producer)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/producer/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
            body:JSON.stringify(producer)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="/"
            }
          else{
            window.location="/producer"
          }
          })
        }
        else{
          alert("Enter All Categories or Enter Category Count again Clearly")
          window.location="/producer"
        }
      }
        
        }

        const deleteProducer=(e)=>{
          if(localStorage.getItem("updateCondition")=="yes"){
            localStorage.removeItem("producerId")
              localStorage.removeItem("name")
              localStorage.removeItem("nic")
              localStorage.removeItem("basic")
              localStorage.removeItem("categories")
              localStorage.removeItem("catcount")
              localStorage.removeItem("catId")
              localStorage.removeItem("updateCondition")
              alert("cant delete u have given update id")
              window.location="/producer"
          }
          else{
            fetch("https://into-uncommon.herokuapp.com/intouncommon/producer/delete?id="+producerId,{
            method:"DELETE",
            headers:{"header":localStorage.getItem("user")}
          })
          .then(res=>res.json())
          .then((result)=>{
            var error = ""
            console.log(error)
        if(result==error){
          window.location="/"
        }
      else{
        window.location="/producer"
      }        
    })
          }
        }

        const getCatCount=(e)=>{
          if(localStorage.getItem("catcount")==null){
            localStorage.setItem("catcount",catCount)
            localStorage.setItem("presentCount",1)
            localStorage.setItem("name",name)
            localStorage.setItem("nic",nicNo)
            localStorage.setItem("basic",basicDetails)
            console.log("catcount"+localStorage.getItem("catcount"))
            console.log(localStorage.getItem("presentCount"))
            alert("Enter cat Ids")
          }
          else{
            //remove cat count and cat ids and present count
            localStorage.removeItem("catcount")
          localStorage.removeItem("catId")
          localStorage.removeItem("categories")
          localStorage.removeItem("presentCount")
            alert("Removed All category details re enter categegry count")
          }
          
        }
        
        const setCateories=(e)=>{
          if(localStorage.getItem("catcount")==null){
            alert("You should enter the category Count first")
            window.location="/producer"
          }
          else{
            if(parseInt(localStorage.getItem("presentCount"))>parseInt(localStorage.getItem("catcount"))){
              alert("All Categories are added.Now submit producer Details")
              window.location="/producer"
            }
            else{
              localStorage.setItem("catId"+localStorage.getItem("presentCount"),catId)
              var presentCount = parseInt(localStorage.getItem("presentCount"))
              presentCount+=1;
              localStorage.setItem("presentCount",presentCount)
              alert(localStorage.getItem("presentCount"))
              if(localStorage.getItem("presentCount")>localStorage.getItem("catcount")){
                const objectArray = [];
                for(var i=1;i<=localStorage.getItem("catcount");i++){
                  objectArray.push({catId:localStorage.getItem("catId"+i)})
                }
                localStorage.setItem("categories",JSON.stringify(objectArray))
                alert("All Categories are added.Now submit producer Details")
              }
              window.location="/producer"
            }
          }
        }
        const reEnter=(e)=>{
          localStorage.removeItem("name")
          localStorage.removeItem("nic")
          localStorage.removeItem("basic")
          localStorage.removeItem("catString")
          localStorage.removeItem("catcount")
          localStorage.removeItem("catId")
          localStorage.removeItem("categories")
          localStorage.removeItem("presentCount")
          localStorage.removeItem("producerId")
          localStorage.removeItem("updateCondition")
          localStorage.removeItem("producerCatString")
          window.location="/producer"
        }
        function showCateories(){
          fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
        var string="<h3 style='color:red;'>Available Categories</h3><ul>"
        var frame = document.getElementById("showingcat")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].categoryId+"<br></br>CATEGORY : "+result[i].type+"<br></br>COMMON : "+result[i].common+"</p></li>"
      }
      string+="</ul>"
      frame.innerHTML = string
      localStorage.setItem("catString",string)
      alert(string)
  })
        }

        function showCats(){
          fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
        var string="<h3 style='color:red;'>Available Categories</h3><ul>"
        var frame = document.getElementById("showingcat")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].categoryId+"<br></br>CATEGORY : "+result[i].type+"<br></br>COMMON : "+result[i].common+"</p></li>"
      }
      string+="</ul>"
      frame.innerHTML = string
           
  })
        }

        function updateProducer(){
          fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducers",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          setProducer(result)
        var i =0
        console.log("producer Id : "+producerId)
        localStorage.removeItem("producerId")
        localStorage.setItem("producerId",producerId)
        localStorage.setItem("updateCondition","yes")
        for(i=0;i<result.length;i++){
          if(result[i].producerId == producerId){
            localStorage.setItem("name",result[i].name)
            localStorage.setItem("nic",result[i].nicNo)
            localStorage.setItem("categories",JSON.stringify(result[i].producerCategories))
            localStorage.setItem("basic",result[i].basicDetails)
            var string="<h3 style='color:red;'>Producers Category Ids</h3><ul>"
        var frame = document.getElementById("catShowing")
        var j =0
        for(j=0;j<result[i].producerCategories.length;j++){
          string+="<li><p>CATEGORY ID : "+result[i].producerCategories[j].catId+"</p></li>"
      }
      string+="</ul>"
      frame.innerHTML = string
      localStorage.setItem("producerCatString",string)
            break
          }
      }
           
  })
        }

        const changeProducer=(e)=>{
          if(localStorage.getItem("catcount")==null){
            alert("You should enter the category Count first")
        window.location="/producer"
          }
          else{
            if(parseInt(localStorage.getItem("presentCount"))>parseInt(localStorage.getItem("catcount"))){
              const producer ={producerId,name,basicDetails,nicNo,producerCategories}
          console.log("change Producer")
          console.log(producer)
          if(localStorage.getItem("updateCondition")=="yes"){
            localStorage.removeItem("updateCondition")
            fetch("https://into-uncommon.herokuapp.com/intouncommon/producer/update?id="+localStorage.getItem("producerId"),{
              method:"PUT",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
              body:JSON.stringify(producer)
            })
            .then(res=>res.text())
            .then((result)=>{
              console.log(result)
              var error = "Error username or password"
              localStorage.removeItem("producerId")
              localStorage.removeItem("name")
              localStorage.removeItem("nic")
              localStorage.removeItem("basic")
              localStorage.removeItem("catcount")
              localStorage.removeItem("catId")
              localStorage.removeItem("categories")
              localStorage.removeItem("presentCount")
              if(result==error){
                window.location="/"
              }
            else{
              window.location="/producer"
            }
            })
          }
          else{
            alert("cant update without id")
            window.location="/producer"
          }
            }
            else{
              alert("Enter All Categories or Enter Category Count again Clearly")
          window.location="/producer"
            }
          }
        }

        function showProducers(){
          console.log(localStorage.getItem("user"))
          fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducers",{
            headers:{"header":localStorage.getItem("user")}
          })
          .then(res=>res.json())
          .then((result)=>{
          var string="<h3 style='color:red;'>Available Producers</h3><ul>"
          var frame = document.getElementById("showing")
          var i =0
          for(i=0;i<result.length;i++){
            string+="<li><p>ProducerID : "+result[i].producerId+"<br></br>Nic No : "+result[i].nicNo+"<br></br>ProducerName : "+result[i].name+"<br></br>BasicDetails : "+result[i].basicDetails
            string+="<ul>"
            var j=0
            for(j=0;j<result[i].producerCategories.length;j++){
              string+="<li><p>CATEGORY ID : "+result[i].producerCategories[j].catId+"</p></li>"
          }
          string+="</ul></p></li>"
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
      
      // if(localStorage.getItem("catString")==null){
        
      // }
      // else{
      //   var frame = document.getElementById("showingcat")
      //   frame.innerHTML = localStorage.getItem("catString");
      //   localStorage.removeItem("catString")
      // }
      // if(localStorage.getItem("producerCatString")==null){
        
      // }
      // else{
      //   var frame = document.getElementById("catShowing")
      //   frame.innerHTML = localStorage.getItem("producerCatString");
      //   localStorage.removeItem("producerCatString")
      // }
      },[])




    return(
       <div>
        {valid? <div>
        <div class="links" style={{textAlign:"left"}}>
        <a href="/category"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={reEnter}>Refres All</button>
        </div>
        <div style={{textAlign:"left" , top:0}}>
            
            <button onClick={showProducers}>SHOW PRODUCERS</button><br></br>
            <button onClick={showCats}>SHOW CATEGORIES</button>
           </div>
      <div id="adding" style={{textAlign:"center"}}>
     
        <h1 style={{textAlign:"center",color:"purple"}}><u>Producers</u></h1>
        <h3 style={{color: "red"}}>Add Producer</h3>
        
      <form>
      <label style={{color: "blue"}}>Producer Name</label><br></br>
          <input label="name" varient="Outlined" fullWidth placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}>
          </input><br></br>

          <label style={{color: "blue"}}>Producer Basic</label><br></br>
          <input label="basic" varient="Outlined" fullWidth placeholder="Basic Details"
value={basicDetails}
onChange={(e)=>setBasicDetails(e.target.value)}>
          </input><br></br>

          <label style={{color: "blue"}}>Nic No</label><br></br>
          <input label="password" varient="Outlined" fullWidth placeholder="NIC No"
value={nicNo}
onChange={(e)=>setNicNo(e.target.value)}>
          </input><br></br>

          <label style={{color: "blue"}}>Category Amount</label><br></br>
          <input label="Count" varient="Outlined" fullWidth placeholder="Category Amount"
value={catCount}
onChange={(e)=>setCatCount(e.target.value)}>
          </input><br></br>
<button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={getCatCount}>Submit Category Amount</button>

         <br></br><label style={{color: "blue"}}>Cat Id</label><br></br>
          <input label="contact" varient="Outlined" fullWidth placeholder="Contact"
value={catId}
onChange={(e)=>setCatId(e.target.value)}>
          </input><br></br>
      </form>
      <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={setCateories}>Add Category</button>
      <br></br>
<button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addProducer}>Submit</button>
      </div>

      <div class="updating" style={{textAlign:"center"}}>
      <h3 style={{color: "red"}}>Update Producer</h3>
      <form>
          <input label="user id" varient="Outlined" fullWidth type="text" placeholder="User ID"
          value={producerId}
          onChange={(e)=>setProducerId(e.target.value)}>
          </input><br></br>
          <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={updateProducer}>Update</button>
        </form>
        <h3 style={{color: "red"}}>Change Producer</h3>
        <form>
      <label style={{color: "blue"}}>Producer Name</label><br></br>
          <input label="name" varient="Outlined" fullWidth placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}>
          </input><br></br>

          <label style={{color: "blue"}}>Producer Basic</label><br></br>
          <input label="basic" varient="Outlined" fullWidth placeholder="Basic Details"
value={basicDetails}
onChange={(e)=>setBasicDetails(e.target.value)}>
          </input><br></br>

          <label style={{color: "blue"}}>Nic No</label><br></br>
          <input label="password" varient="Outlined" fullWidth placeholder="NIC No"
value={nicNo}
onChange={(e)=>setNicNo(e.target.value)}>
          </input><br></br>
          <div class="shawing" id="catShowing" style={{textAlign:"center"}}>

</div>
          <label style={{color: "blue"}}>Category Amount</label><br></br>
          <input label="Count" varient="Outlined" fullWidth placeholder="Category Amount"
value={catCount}
onChange={(e)=>setCatCount(e.target.value)}>
          </input><br></br>
<button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={getCatCount}>Submit Category Amount</button>

         <br></br><label style={{color: "blue"}}>Cat Id</label><br></br>
          <input label="contact" varient="Outlined" fullWidth placeholder="Contact"
value={catId}
onChange={(e)=>setCatId(e.target.value)}>
          </input><br></br>
      </form>
      <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={setCateories}>Add Category</button>
      <br></br>
 
<button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={changeProducer}>Submit</button>
      </div>


      <div class="deleting"  style={{textAlign:"center"}}>
      <h3 style={{color: "red"}}>Remove Producer</h3>
        <form>
          
          <input label="producer id" varient="Outlined" fullWidth type="text" placeholder="Producer ID"
          value={producerId}
          onChange={(e)=>setProducerId(e.target.value)}>
          </input><br></br>
          <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={deleteProducer}>Delete</button>
        </form>
      </div>
      <div id="showingcat"></div>
      <div class="shawing" id="showing" >
      
      </div>
  </div>:<div><h2>Log In First</h2></div>}
       </div>
    )
}

export default Producer;