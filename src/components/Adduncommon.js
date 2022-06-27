import React, { useEffect, useState } from "react";

function Adduncommon(){

    const[id,setId] = useState('')
    const[uses,setUses] = useState('')
    const[size,setSize] = useState('')
    const[material,setMaterial] = useState('')
    const[color,setColor] = useState('')
    const[options,setOptions] = useState('')
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
    const[uncommonProduct,setProductions]= useState([])

    const addProduct=(e)=>{
      
      fetch("http://localhost:8080/intouncommon/getcategories",{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
      var i =0
      for(i=0;i<result.length;i++){
        if(result[i].categoryId==categoryId && result[i].common==false){
          if(producerId==null || stateId==null){
            alert("Invalid producer or invalid state id")
            window.location="http://localhost:3000/product"
          }
          const category ={categoryId}
          const producer ={producerId}
          const statecodes = {stateId}
           const uncommonProduct = {id,uses,specialData,specialUsage,madeIn : madein,size,color,price,material,options,warranty,delivery,designBy:design,qualityOf : quality,category,producer,statecodes}
           console.log(uncommonProduct)
            fetch("http://localhost:8080/intouncommon/uncommon/add",{
                method:"POST",
                headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
                body:JSON.stringify(uncommonProduct)
              })
              .then(res=>res.text())
              .then((result)=>{
                console.log(result)
                var error = "Error username or password"
                if(result==error){
                  window.location="http://localhost:3000"
                }
              else{
                window.location="http://localhost:3000/product"
              }
              }) 
        }
        else{
          if(result[i].categoryId==categoryId){
            alert("Wrong Type Category")
            window.location="http://localhost:3000/product"
            break
          }
        }
    }
})
      
    }
    const showState=(e)=>{
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
          string+="<li><p>ID : "+result[i].stateId+"<br></br>StateType : "+result[i].state_type+"<br></br>Repay : "+result[i].statecodes.repayColor+"<br></br>Change : "+result[i].statecodes.changeColor+"<br></br>Warranty : "+result[i].statecodes.warrantyColor+"<br></br>Discount : "+result[i].statecodes.discountColor+"</p></li>"
      }
      string+="</ul>"
      console.log(string)
      localStorage.setItem("stateString",string)
      alert(string)
           
  })
    }
    const showProducers=(e)=>{
        console.log(localStorage.getItem("user"))
        fetch("http://localhost:8080/intouncommon/getproducers",{
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
      localStorage.setItem("producerString",string)
      alert(string)
  })
    }

    const showCateories=(e)=>{
        fetch("http://localhost:8080/intouncommon/getcategories",{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
      var string="<h3 style='color:red;'>Available Categories</h3><ul>"
      var frame = document.getElementById("showing")
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
        if(localStorage.getItem("catString")==null){
        
        }
        else{
          var frame = document.getElementById("showing")
          frame.innerHTML = localStorage.getItem("catString");
          localStorage.removeItem("catString")
        }
        if(localStorage.getItem("producerString")==null){
        
        }
        else{
          var frame = document.getElementById("showing")
          frame.innerHTML = localStorage.getItem("producerString");
          localStorage.removeItem("producerString")
        }
        if(localStorage.getItem("stateString")==null){
        
        }
        else{
          var frame = document.getElementById("showing")
          frame.innerHTML = localStorage.getItem("stateString");
          localStorage.removeItem("stateString")
        }
      },[])

    return(
        <div><div class="links" style={{textAlign:"left"}}>
        <a href="/product"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
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
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={size}
    onChange={(e)=>setSize(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Meterial</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={material}
    onChange={(e)=>setMaterial(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Color</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={color}
    onChange={(e)=>setColor(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>options</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={options}
    onChange={(e)=>setOptions(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Price</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={price}
    onChange={(e)=>setPrice(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Warranty</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={warranty}
    onChange={(e)=>setWarranty(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Delivery And Payment</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={delivery}
    onChange={(e)=>setDelivery(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Madein</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={madein}
    onChange={(e)=>setMadein(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Design By</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={design}
    onChange={(e)=>setDesign(e.target.value)}>
                </input><br></br>
                <label style={{color: "blue"}}>Quality</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
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
                <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={showCateories}>Show Categories</button>
                <br></br>
                <label style={{color: "blue"}}>Producer</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Producer"
    value={producerId}
    onChange={(e)=>setProducer(e.target.value)}>
                </input><br></br>
                <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={showProducers}>Show Producers</button>
                <br></br>
                <label style={{color: "blue"}}>State Code</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="StateCode"
    value={stateId}
    onChange={(e)=>setStatecodes(e.target.value)}>
                </input><br></br>
                <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={showState}>Show StateCodes</button>
                <br></br>
            </form>
    <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addProduct}>Submit</button>
            </div>

            <div class="links" style={{textAlign:"left"}}>
        <a href="/productimages"><p style={{color: "green"}}><b>Add Images</b></p></a>
        <br></br>
        </div>
            <div id="showing"></div>
        </div>
    )
}

export default Adduncommon