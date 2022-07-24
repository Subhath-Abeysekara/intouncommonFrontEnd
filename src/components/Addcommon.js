import React, { useEffect, useState } from "react";

function Addcommon(){

    const[id,setId] = useState('')
    const[uses,setUses] = useState('')
    const[specialData,setSpecialData] = useState("special")
    const[size,setSize] = useState('')
    const[material,setMaterial] = useState('')
    const[brand,setBrand] = useState('')
    const[color,setColor] = useState('')
    const[options,setOptions] = useState('')
    const[price,setPrice] = useState('')
    const[warranty,setWarranty] = useState('')
    const[delivery,setDelivery] = useState('')
    //[primaryData,setPrimaryData] = useState('')
    const[producerId,setProducer] = useState(0)
    const[categoryId,setCategory] = useState(0)
    const[valid,setValid]=useState(false)
    const[productions,setProductions]= useState([])

    const addProduct=(e)=>{
      
      const commonCheckDto = {categoryId , producerId}
      fetch("https://into-uncommon.herokuapp.com/intouncommon/checkCommon",{
        headers:{"header":localStorage.getItem("user")},
        body:JSON.stringify(commonCheckDto)
      })
      .then(res=>res.text())
      .then((result)=>{
        console.log(result)
      var i =0
        if(result!=="error"){
          
          const category = {categoryId}
      const producer ={producerId}
       const production = {id,uses,brand,specialData,size,color,material,price,warranty,options,delivery}
       const productionDto ={productions:production,categoryId,producerId}
       alert(productionDto)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/product/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
            body:JSON.stringify(productionDto)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="/"
            }
          else{
            window.location="/product"
          }
          })
          
        }
        else{
          alert("Invalid producer or invalid category")
            window.location="/product"
        }
        
})
      
       
    }
    const showProducers=(e)=>{
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
      frame.innerHTML = string
    localStorage.setItem("catString",string)
    alert(string)
  })
    }

    const showCateories=(e)=>{
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
      var string="<h3 style='color:red;'>Available Categories</h3><ul>"
      var frame = document.getElementById("showingcat")
      var i =0
      for(i=0;i<result.length;i++){
        if(result[i].common==true){
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
      },[])


    return(
        <div>
          {valid?<div><div class="links" style={{textAlign:"left"}}>
        <a href="/product"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        </div>
        <div style={{textAlign:"left" , top:0}}>
            
            <button onClick={showProducers}>SHOW PRODUCERS</button><br></br>
            <button onClick={showCateories}>SHOW CATEGORIES</button>
           </div>
        <div id="adding" style={{textAlign:"center"}}>
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>Common Products</u></h1>
              <h3 style={{color: "red"}}>Add Product</h3>
              
            <form>
            <label style={{color: "blue"}}>Brand Name</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="BRAND"
    value={brand}
    onChange={(e)=>setBrand(e.target.value)}>
                </input><br></br><br></br>
            <label style={{color: "blue"}}>Uses</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="USES"
    value={uses}
    onChange={(e)=>setUses(e.target.value)}>
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
                <label style={{color: "blue"}}>Category</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Category"
    value={categoryId}
    onChange={(e)=>setCategory(e.target.value)}>
                </input>
                <br></br>
                <label style={{color: "blue"}}>Producer</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Producer"
    value={producerId}
    onChange={(e)=>setProducer(e.target.value)}>
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
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default Addcommon