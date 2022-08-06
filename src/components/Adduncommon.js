import React, { useEffect, useState } from "react";

function Adduncommon(){

    const[id,setId] = useState('')
    const[uses,setUses] = useState('')
    const[size,setSize] = useState('')
    const[material,setMaterial] = useState('')
    const[color,setColor] = useState('')
    const[options,setOptions] = useState('')
    const[brand,setBrand] = useState('')
    const[price,setPrice] = useState('')
    const[warranty,setWarranty] = useState('')
    const[delivery,setDelivery] = useState('')
    const[madein,setMadein] = useState('')
    const[design,setDesign] = useState('')
    const[quality,setQuality] = useState('')
    const[specialData,setSpecialData] = useState('')
    const[specialUsage,setSpecialUsage] = useState('')
    const[producerId,setProducer] = useState(0)
    const[categoryId,setCategory] = useState(0)
    const[stateId,setStatecodes] = useState(0)
    const[valid,setValid]=useState(false)
    const[uncommonProduct,setProductions]= useState([])

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

    const addProduct=(e)=>{
      
      const uncommonCheckDto = {categoryId , producerId,stateId}
      fetch("https://into-uncommon.herokuapp.com/intouncommon/checkUncommon",{
        method:"POST",
        headers:{"header":releaseToken(localStorage.getItem("user"))},
        body:JSON.stringify(uncommonCheckDto)
      })
      .then(res=>res.text())
      .then((result)=>{
      var i =0
        if(result!=="error"){
          
          const category ={categoryId}
          const producer ={producerId}
          const statecodes = {stateId}
           const uncommonProduct = {id,uses,brand,specialData,specialUsage,madeIn : madein,size,color,price,material,options,warranty,delivery,designBy:design,qualityOf : quality}
           const uncommonProductDto={uncommonProduct,categoryId,producerId,stateId}
           console.log(uncommonProductDto)
            fetch("https://into-uncommon.herokuapp.com/intouncommon/uncommon/add",{
                method:"POST",
                headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":releaseToken(localStorage.getItem("user"))},
                body:JSON.stringify(uncommonProductDto)
              })
              .then(res=>res.text())
              .then((result)=>{
                console.log(result)
                alert("product Id - "+result)
                var error = "Error username or password"
                if(result==error){
                  window.location="/"
                }
              else{
                window.location="/adduncommon"
              }
              }) 
        }
        else{
          alert("Invalid producer or invalid state or invalid category")
            window.location="/adduncommon"
        }

})
      
    }
    const showState=(e)=>{
        console.log(localStorage.getItem("user"))
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getstates",{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
        })
        .then(res=>res.json())
        .then((result)=>{
        var string="<h3 style='color:red;'>Available StateCodes</h3><ul>"
        var frame = document.getElementById("showingstate")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].stateId+"<br></br>Repay : "+result[i].repayColor+"<br></br>Change : "+result[i].changeColor+"<br></br>Warranty : "+result[i].warrantyColor+"<br></br>Discount : "+result[i].discountColor+"</p></li>"
      }
      string+="</ul>"
    frame.innerHTML = string
    localStorage.setItem("catString",string)
    alert(string)
  })
    }
    const showProducers=(e)=>{
        console.log(localStorage.getItem("user"))
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducers",{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
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
    frame.innerHTML = string
    localStorage.setItem("catString",string)
    alert(string)
  })
    }

    const showCateories=(e)=>{
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
        headers:{"header":releaseToken(localStorage.getItem("user"))}
      })
      .then(res=>res.json())
      .then((result)=>{
      var string="<h3 style='color:red;'>Available Categories</h3><ul>"
      var frame = document.getElementById("showingcat")
      var i =0
      for(i=0;i<result.length;i++){
        if(result[i].common==false){
          string+="<li><p>ID : "+result[i].categoryId+"<br></br>CATEGORY : "+result[i].type+"<br></br>COMMON : "+result[i].common+"</p></li>"
        }
    }
    string+="</ul>"
    frame.innerHTML = string
    localStorage.setItem("catString",string)
    alert(string)
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
        // if(localStorage.getItem("catString")==null){
        
        // }
        // else{
        //   var frame = document.getElementById("showing")
        //   frame.innerHTML = localStorage.getItem("catString");
        //   localStorage.removeItem("catString")
        // }
        // if(localStorage.getItem("producerString")==null){
        
        // }
        // else{
        //   var frame = document.getElementById("showing")
        //   frame.innerHTML = localStorage.getItem("producerString");
        //   localStorage.removeItem("producerString")
        // }
        // if(localStorage.getItem("stateString")==null){
        
        // }
        // else{
        //   var frame = document.getElementById("showing")
        //   frame.innerHTML = localStorage.getItem("stateString");
        //   localStorage.removeItem("stateString")
        // }
      },[])

    return(
      <div>
        {valid? <div><div class="links" style={{textAlign:"left"}}>
        <a href="/product"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        </div>
        <div style={{textAlign:"left" , top:0}}>
            
            <button onClick={showProducers}>SHOW PRODUCERS</button><br></br>
            <button onClick={showCateories}>SHOW CATEGORIES</button>
            <button onClick={showState}>SHOW STATES</button>
           </div>
        <div id="adding" style={{textAlign:"center"}}>
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>Uncommon Products</u></h1>
              <h3 style={{color: "red"}}>Add Product</h3>
              
            <form>
            
            <label style={{color: "blue"}}>Uses</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="USES"
    value={uses}
    onChange={(e)=>setUses(e.target.value)}>
                </input><br></br><br></br>
                <label style={{color: "blue"}}>Special Details</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Special Details"
    value={specialData}
    onChange={(e)=>setSpecialData(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Size</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Size"
    value={size}
    onChange={(e)=>setSize(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Meterial</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Material"
    value={material}
    onChange={(e)=>setMaterial(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Color</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Color"
    value={color}
    onChange={(e)=>setColor(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>options</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Options"
    value={options}
    onChange={(e)=>setOptions(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Price</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Price"
    value={price}
    onChange={(e)=>setPrice(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Warranty</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Warranty"
    value={warranty}
    onChange={(e)=>setWarranty(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Delivery And Payment</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Delivery"
    value={delivery}
    onChange={(e)=>setDelivery(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Madein</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="MadeIn"
    value={madein}
    onChange={(e)=>setMadein(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Design By</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="DesignBy"
    value={design}
    onChange={(e)=>setDesign(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Quality</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Quality"
    value={quality}
    onChange={(e)=>setQuality(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Special Usage</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Special Usage"
    value={specialUsage}
    onChange={(e)=>setSpecialUsage(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Category</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Category"
    value={categoryId}
    onChange={(e)=>setCategory(e.target.value)}>
                </input><br></br>
              
                <label style={{color: "blue"}}>Producer</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Producer"
    value={producerId}
    onChange={(e)=>setProducer(e.target.value)}>
                </input><br></br>
                
                <label style={{color: "blue"}}>State Code</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="StateCode"
    value={stateId}
    onChange={(e)=>setStatecodes(e.target.value)}>
                </input><br></br>
                
            </form>
    <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addProduct}>Submit</button>
            </div>

            <div class="links" style={{textAlign:"left"}}>
        <a href="/productimages"><p style={{color: "green"}}><b>Add Images</b></p></a>
        <br></br>
        </div>
        <div id="showingcat"></div>
      <div class="shawing" id="showing" >
      </div>
      <div id="showingstate"></div>
        </div>:<div><h2>Log In First</h2></div>}
      </div>
    )
}

export default Adduncommon