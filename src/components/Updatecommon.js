import React, { useEffect, useState } from "react";

function Updatecommon(){

    const[id,setId] = useState(localStorage.getItem("id"))
    const[uses,setUses] = useState(localStorage.getItem("uses"))
    const[specialData,setSpecialData] = useState(localStorage.getItem("specialData"))
    const[primaryData,setPrimaryData] = useState(localStorage.getItem("primaryData"))
    const[producer,setProducer] = useState(JSON.parse(localStorage.getItem("producer")))
    const[category,setCategory] = useState(JSON.parse(localStorage.getItem("category")))
    const[production,setProductions]= useState([])

    const updateProducter=(e)=>{
        fetch("http://localhost:8080/intouncommon/getproducts",{
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
        if(result[i].id == id && result[i].category.common==true){
          localStorage.setItem("id",result[i].id)
          localStorage.setItem("uses",result[i].uses)
          localStorage.setItem("category",JSON.stringify(result[i].category))
          localStorage.setItem("producer",JSON.stringify(result[i].producer))
          localStorage.setItem("specialData",result[i].specialData)
          localStorage.setItem("primaryData",result[i].primaryData)
          break
        }
    }
         
})
      }

      const changeProducter=(e)=>{
          
        const production = {id,uses,specialData,primaryData,category,producer}
          if(localStorage.getItem("updateCondition")=="yes"){
            localStorage.removeItem("updateCondition")
            
            fetch("http://localhost:8080/intouncommon/product/update?id="+localStorage.getItem("id"),{
              method:"PUT",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
              body:JSON.stringify(production)
            })
            .then(res=>res.text())
            .then((result)=>{
              console.log(result)
              var error = "Error username or password"
              localStorage.removeItem("id")
              localStorage.removeItem("uses")
              localStorage.removeItem("specialData")
              localStorage.removeItem("primaryDate")
              localStorage.removeItem("category")
              localStorage.removeItem("producer")
              if(result==error){
                window.location="http://localhost:3000"
              }
            else{
              window.location="http://localhost:3000/product"
            }
            })
          }
          else{
            alert("cant update without id")
            window.location="http://localhost:3000/updatecommon"
          }
            }

            useEffect(()=>{
                console.log(localStorage.getItem("user"))
                fetch("http://localhost:8080/intouncommon/getproducts",{
                  headers:{"header":localStorage.getItem("user")}
                })
                .then(res=>res.json())
                .then((result)=>{
                var string="<h3 style='color:red;'>Available Common Products</h3><ul>"
                var frame = document.getElementById("showing")
                var i =0
                for(i=0;i<result.length;i++){
                    if(result[i].category.common==true){
                        string+="<li><p>ID : "+result[i].id+"<br></br>PRODUCT : "+result[i].category.type+"<br></br>COMMON : "+result[i].category.common+"<br></br>USES : "+result[i].uses+"<br></br>SPECIAL DETAILS : "+result[i].specialData+"<br></br>PRIMARY DETAILS : "+result[i].primaryData+"<br></br>PRODUCER : "+result[i].producer.name+"</p></li>"
                    }
              }
              string+="</ul>"
              frame.innerHTML = string
                   
          })
              },[])

    return(
        <div><div class="links" style={{textAlign:"left"}}>
        <a href="/product"><p style={{color: "green"}}><b>BACK</b></p></a>
        <br></br>
        </div>
        <div id="updatinf" style={{textAlign:"center"}}>
        <h3 style={{color: "red"}}>Update Common Product</h3>
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
                <label style={{color: "blue"}}>Primary Details</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="Primary Details"
    value={primaryData}
    onChange={(e)=>setPrimaryData(e.target.value)}>
                </input><br></br>
            
            </form>
    <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={changeProducter}>Submit</button>
            </div>
            <div id="showing"></div>
        </div>
    )
}

export default Updatecommon