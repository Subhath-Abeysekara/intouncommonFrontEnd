import React, { useEffect, useState } from "react";

function Updateuncommon(){

    const[id,setId] = useState(localStorage.getItem("id"))
    const[uses,setUses] = useState(localStorage.getItem("uses"))
    const[specialData,setSpecialData] = useState(localStorage.getItem("specialData"))
    const[specialUsage,setSpecialUsage] = useState(localStorage.getItem("specialUsage"))
    const[size,setSize] = useState(localStorage.getItem("size"))
    const[material,setMaterial] = useState(localStorage.getItem("material"))
    const[brand,setBrand] = useState(localStorage.getItem("brand"))
    const[color,setColor] = useState(localStorage.getItem("color"))
    const[options,setOptions] = useState(localStorage.getItem("options"))
    const[price,setPrice] = useState(localStorage.getItem("price"))
    const[warranty,setWarranty] = useState(localStorage.getItem("warranty"))
    const[delivery,setDelivery] = useState(localStorage.getItem("delivery"))
    const[amount,setAmount] = useState(localStorage.getItem("amount"))
    const[madein,setMadein] = useState(localStorage.getItem("madein"))
    const[design,setDesign] = useState(localStorage.getItem("design"))
    const[quality,setQuality] = useState(localStorage.getItem("quality"))
    const[producer,setProducer] = useState(JSON.parse(localStorage.getItem("producer")))
    const[category,setCategory] = useState(JSON.parse(localStorage.getItem("category")))
    const[statecodes,setStatecodes] = useState(JSON.parse(localStorage.getItem("state")))
    const[valid,setValid]=useState(false)
    const[uncommonProduct,setProductions]= useState([])

    const updateProducter=(e)=>{
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducts",{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
        setProducer(result)
      var i =0
      console.log("product Id : "+id)
      localStorage.removeItem("id")
      localStorage.setItem("id",id)
      localStorage.setItem("updateCondition","yes")
      for(i=0;i<result.length;i++){
        if(result[i].id == id && result[i].category.common==false){
          localStorage.setItem("id",result[i].id)
          localStorage.setItem("uses",result[i].uses)
          localStorage.setItem("category",JSON.stringify(result[i].category))
          localStorage.setItem("producer",JSON.stringify(result[i].producer))
          localStorage.setItem("state",JSON.stringify(result[i].statecodes))
          localStorage.setItem("specialData",result[i].specialData)
          localStorage.setItem("specialUsage",result[i].specialUsage)
          localStorage.setItem("madein",result[i].madeIn)
          localStorage.setItem("quality",result[i].qualityOf)
          localStorage.setItem("design",result[i].designBy)
          localStorage.setItem("size",result[i].size)
          localStorage.setItem("color",result[i].color)
          localStorage.setItem("price",result[i].price)
          localStorage.setItem("material",result[i].material)
          localStorage.setItem("options",result[i].options)
          localStorage.setItem("warranty",result[i].warranty)
          localStorage.setItem("delivery",result[i].delivery)
          localStorage.setItem("brand",result[i].brand)
          localStorage.setItem("amount",result[i].amount)
          break
        }
    }
         
})
      }

      const changeProducter=(e)=>{
          
        const uncommonProduct = {id,uses,amount,brand,specialData,specialUsage,madeIn : madein,size,color,price,material,options,warranty,delivery,designBy:design,qualityOf : quality,category,producer,statecodes}
          if(localStorage.getItem("updateCondition")=="yes"){
            localStorage.removeItem("updateCondition")
            
            fetch("https://into-uncommon.herokuapp.com/intouncommon/uncommon/update?id="+localStorage.getItem("id"),{
              method:"PUT",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":localStorage.getItem("user")},
              body:JSON.stringify(uncommonProduct)
            })
            .then(res=>res.text())
            .then((result)=>{
              console.log(result)
              var error = "Error username or password"
              localStorage.removeItem("id")
              localStorage.removeItem("uses")
              localStorage.removeItem("specialUsage")
              localStorage.removeItem("madein")
              localStorage.removeItem("size")
              localStorage.removeItem("color")
              localStorage.removeItem("material")
              localStorage.removeItem("price")
              localStorage.removeItem("warranty")
              localStorage.removeItem("brand")
              localStorage.removeItem("options")
              localStorage.removeItem("amount")
              localStorage.removeItem("specialData")
              localStorage.removeItem("delivery")
              localStorage.removeItem("category")
              localStorage.removeItem("producer")
              localStorage.removeItem("state")
              localStorage.removeItem("madein")
              localStorage.removeItem("quality")
              localStorage.removeItem("design")
              if(result==error){
                window.location="/"
              }
            else{
              window.location="/product"
            }
            })
          }
          else{
            alert("cant update without id")
            window.location="/updateuncommon"
          }
            }

            function showProducts(){
              console.log(localStorage.getItem("user"))
              fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducts",{
                headers:{"header":localStorage.getItem("user")}
              })
              .then(res=>res.json())
              .then((result)=>{
              var string="<h3 style='color:red;'>Available Uncommon Products</h3><ul>"
              var frame = document.getElementById("showing")
              var i =0
              for(i=0;i<result.length;i++){
                  if(result[i].category.common==false){
                    string+="<li><p>ID : "+result[i].id+"<br></br>Uses : "+result[i].uses+"<br></br>Brand : "+result[i].brand+"<br></br>Special Details : "+result[i].specialData+"<br></br>Size : "+result[i].size+"<br></br>Color : "+result[i].color+"<br></br>Material : "+result[i].material+"<br></br>Price : "+result[i].price+"<br></br>Options : "+result[i].options+"<br></br>Waranty : "+result[i].warranty+"<br></br>delivery : "+result[i].delivery+"<br></br>Special Usage : "+result[i].specialUsage+"<br></br>Responsibilities : "+result[i].responsibility
                    if(result[i].category!=null){
                      string+="<br></br>Product Material : "+result[i].category.material+"<br></br>Product Type : "+result[i].category.type+"<br></br>Common : "+result[i].category.common
                    }
                    if(result[i].producer!=null){
                      string+="<br></br>Producer Name : "+result[i].producer.name+"<br></br>Producer Id : "+result[i].producer.producerId+"<br></br>Producer Basic : "+result[i].producer.basicDetails
                    }
                    if(result[i].statecodes!=null){
                      string+="<br></br>State Code : "+result[i].statecodes.state_type+"<br></br>Repay : "+result[i].statecodes.repayColor+"<br></br>Change : "+result[i].statecodes.changeColor+"<br></br>Warranty : "+result[i].statecodes.warrantyColor+"<br></br>Discount : "+result[i].statecodes.discountColor
                    }
                    string+="</p></li>"
                    }
            }
            string+="</ul>"
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
                
              },[])
    return(
        <div>
          {valid?<div><div class="links" style={{textAlign:"left"}}>
        <a href="/product"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        <div style={{textAlign:"left" , top:0}}>
            <button onClick={showProducts}>SHOW UNCOMMON PRODUCTS</button>
           </div>
        </div>
        <div id="updatinf" style={{textAlign:"center"}}>
        <h3 style={{color: "red"}}>Update Uncommon Product</h3>
        <form>
        <label style={{color: "blue"}}>Product Id</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="USES"
    value={id}
    onChange={(e)=>setId(e.target.value)}>
                </input><br></br><br></br>
        </form>
        <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={updateProducter}>Update Product</button>
        </div>
        <div id="adding" style={{textAlign:"center"}}>
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>Uncommon Products</u></h1>
              <h3 style={{color: "red"}}>Change Product</h3>
              
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
            </form>
    <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={changeProducter}>Submit</button>
            </div>
            <div id="showing"></div>
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default Updateuncommon