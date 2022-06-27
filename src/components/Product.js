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

    const deleteProduct=(e)=>{
        fetch("http://localhost:8080/intouncommon/product/delete?id="+id,{
          method:"DELETE",
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          var error = ""
          console.log(error)
      if(result==error){
        window.location="http://localhost:3000"
      }
    else{
      window.location="http://localhost:3000/product"
    }        
  })
      }
  useEffect(()=>{
      console.log(localStorage.getItem("user"))
      localStorage.removeItem("id")
              localStorage.removeItem("uses")
              localStorage.removeItem("specialData")
              localStorage.removeItem("primaryDate")
              localStorage.removeItem("specialUsage")
              localStorage.removeItem("responsibility")
              localStorage.removeItem("category")
              localStorage.removeItem("producer")
              localStorage.removeItem("state")
      fetch("http://localhost:8080/intouncommon/getproducts",{
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
    string+="</ul>"
    console.log(string)
    frame.innerHTML = string
         
})
    },[])

    return(
        <div>
            <div class="links" style={{textAlign:"left"}}>
        <a href="/category"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        <a href="/adduncommon"><p style={{color: "green"}}><b>Add UncommonProduct</b></p></a>
        
        <a href="/addcommon"><p style={{color: "green"}}><b>Add CommonProduct</b></p></a>
        
        <a href="/updateuncommon"><p style={{color: "green"}}><b>Update UncommonProduct</b></p></a>
        
        <a href="/updatecommon"><p style={{color: "green"}}><b>Update CommonProduct</b></p></a>
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
        </div>
    )
}

export default Product;