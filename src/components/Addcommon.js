import React, { useEffect, useState } from "react";

function Addcommon(){

    const[id,setId] = useState('')
    const[uses,setUses] = useState('')
    const[specialData,setSpecialData] = useState('')
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
    const[productions,setProductions]= useState([])

    const addProduct=(e)=>{
      
      fetch("http://localhost:8080/intouncommon/getcategories",{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
      var i =0
      for(i=0;i<result.length;i++){
        if(result[i].categoryId==categoryId && result[i].common==true){
          if(producerId==null||producerId==0){
            alert("Invalid producer or invalid state id")
            window.location="http://localhost:3000/product"
          }
          const category = {categoryId}
      const producer ={producerId}
       const production = {id,uses,brand,specialData,size,color,material,price,warranty,options,delivery,category,producer}
       alert(production)
        fetch("http://localhost:8080/intouncommon/product/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
            body:JSON.stringify(production)
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
      },[])


    return(
        <div><div class="links" style={{textAlign:"left"}}>
        <a href="/product"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        </div>
        <div id="adding" style={{textAlign:"center"}}>
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>Common Products</u></h1>
              <h3 style={{color: "red"}}>Add Product</h3>
              
            <form>
            <label style={{color: "blue"}}>Brand Name</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="USES"
    value={brand}
    onChange={(e)=>setBrand(e.target.value)}>
                </input><br></br><br></br>
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

export default Addcommon