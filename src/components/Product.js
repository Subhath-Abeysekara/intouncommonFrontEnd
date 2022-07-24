import React, { useEffect, useState } from "react";

function Product(){
    const[id,setId] = useState('')
    const[uses,setUses] = useState('')
    const[specialData,setSpecialData] = useState('')
    const[primaryData,setPrimaryData] = useState('')
    const[specialUsage,setSpecialUsage] = useState('')
    const[responsibility,setResponsibility] = useState('')
    const[producer,setProducer] = useState({})
    const[category,setCategory] = useState({})
    const[statecodes,setStatecodes] = useState({})
    const[productions,setProductions]= useState([])
    const[valid,setValid]=useState(false)

    const deleteProduct=(e)=>{
        fetch("https://into-uncommon.herokuapp.com/intouncommon/product/delete?id="+id,{
          method:"DELETE",
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          var error = "Error username or password"
          console.log(error)
      if(result==error){
        window.location="/"
      }
    else{
      window.location="/product"
    }        
  })
      }

      function showProducts(){
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducts",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          alert(result)
          console.log(result[0])
        var string="<h3 style='color:red;'>Available Products</h3><ul>"
        console.log(string)
        var frame = document.getElementById("showing")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].id+"<br></br>Uses : "+result[i].uses+"<br></br>Brand : "+result[i].brand+"<br></br>Size : "+result[i].size+"<br></br>Color : "+result[i].color+"<br></br>Material : "+result[i].material+"<br></br>Price : "+result[i].price+"<br></br>Options : "+result[i].options+"<br></br>Waranty : "+result[i].warranty+"<br></br>delivery : "+result[i].delivery+"<br></br>Special Usage : "+result[i].specialUsage+"<br></br>madeIn : "+result[i].madeIn+"<br></br>designBy : "+result[i].designBy+"<br></br>qualityOf : "+result[i].qualityOf
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
      string+="</ul>"
      console.log(string)
      frame.innerHTML = string
           
  })
      }


      function showProduct(){
        fetch("https://into-uncommon.herokuapp.com/intouncommon/get/product?id="+id,{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          alert(result)
          console.log(result[0])
        var string="<h3 style='color:red;'>Available Products</h3><ul>"
        console.log(string)
        var frame = document.getElementById("showingone")
        var i =0
        
          string+="<li><p>ID : "+result.id+"<br></br>Uses : "+result.uses+"<br></br>Brand : "+result.brand+"<br></br>Size : "+result.size+"<br></br>Color : "+result.color+"<br></br>Material : "+result.material+"<br></br>Price : "+result.price+"<br></br>Options : "+result.options+"<br></br>Waranty : "+result.warranty+"<br></br>delivery : "+result.delivery+"<br></br>Special Usage : "+result.specialUsage+"<br></br>madeIn : "+result.madeIn+"<br></br>designBy : "+result.designBy+"<br></br>qualityOf : "+result.qualityOf
          if(result.category!=null){
            string+="<br></br>Product Material : "+result.category.material+"<br></br>Product Type : "+result.category.type+"<br></br>Common : "+result.category.common
          }
          if(result.producer!=null){
            string+="<br></br>Producer Name : "+result.producer.name+"<br></br>Producer Id : "+result.producer.producerId+"<br></br>Producer Basic : "+result.producer.basicDetails
          }
          if(result.statecodes!=null){
            string+="<br></br>State Code : "+result.statecodes.state_type+"<br></br>Repay : "+result.statecodes.repayColor+"<br></br>Change : "+result.statecodes.changeColor+"<br></br>Warranty : "+result.statecodes.warrantyColor+"<br></br>Discount : "+result.statecodes.discountColor
          }
          string+="</p></li>"
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
      console.log(localStorage.getItem("user"))
      localStorage.removeItem("id")
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
      
    },[])

    return(
        <div>
          {valid?<div>
            <div class="links" style={{textAlign:"left"}}>
        <a href="/category"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        <a href="/adduncommon"><p style={{color: "green"}}><b>Add UncommonProduct</b></p></a>
        
        <a href="/addcommon"><p style={{color: "green"}}><b>Add CommonProduct</b></p></a>
        
        <a href="/updateuncommon"><p style={{color: "green"}}><b>Update UncommonProduct</b></p></a>
        
        <a href="/updatecommon"><p style={{color: "green"}}><b>Update CommonProduct</b></p></a>
        </div>
        <div style={{textAlign:"left" , top:0}}>
            <button onClick={showProducts}>SHOW PRODUCTS</button><br></br>
            <form>
            <input label="product id" varient="Outlined" fullWidth type="text" placeholder="Product ID"
          value={id}
          onChange={(e)=>setId(e.target.value)}>
          </input><br></br>
            </form>
            <button onClick={showProduct}>SHOW PRODUCT</button>
           </div>
        <div class="deleting"  style={{textAlign:"center"}}>
      <h3 style={{color: "red"}}>Remove Product</h3>
        <form>
          
          <input label="product id" varient="Outlined" fullWidth type="text" placeholder="Product ID"
          value={id}
          onChange={(e)=>setId(e.target.value)}>
          </input><br></br>
          <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={deleteProduct}>Delete</button>
        </form>
      </div>
      <div class="links" style={{textAlign:"left"}}>
        <a href="/productimages"><p style={{color: "green"}}><b>Add Images</b></p></a>
        <br></br>
        </div>
            <div id="showing"></div>
            <div id="showingone"></div>
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default Product;