import React, { useEffect, useState } from "react";

function Category(){

    const[type,setType] = useState('')
    const[common,setCommon] = useState(Boolean)
    const[material,setMaterial] = useState('')
    const[categoryId,setCategoryId]=useState(0)
    const[categories,setCategories] = useState([])
    const addCategory=(e)=>{
        const category ={type,common,material}
        console.log(category)
        fetch("http://localhost:8080/intouncommon/category/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
            body:JSON.stringify(category)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="http://localhost:3000"
            }
          else{
            window.location="http://localhost:3000/category"
          }
          })
        }

        const deleteCategory=(e)=>{
          fetch("http://localhost:8080/intouncommon/category/delete?id="+categoryId,{
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
        window.location="http://localhost:3000/category"
      }        
    })
        }
    useEffect(()=>{
        console.log(localStorage.getItem("user"))
        localStorage.removeItem("userId")
              localStorage.removeItem("name")
              localStorage.removeItem("password")
              localStorage.removeItem("email")
              localStorage.removeItem("contact")
              localStorage.removeItem("updateCondition")
        fetch("http://localhost:8080/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
        var string="<h3 style='color:red;'>Available Categories</h3><ul>"
        var frame = document.getElementById("showing")
        var i =0
        for(i=0;i<result.length;i++){
          string+="<li><p>ID : "+result[i].categoryId+"<br></br>CATEGORY : "+result[i].type+"<br></br>COMMON : "+result[i].common+"</p></li>"
      }
      string+="</ul>"
      frame.innerHTML = string
           
  })
      },[])

    return(
        <div>
          <div class="links" style={{textAlign:"right"}}>
          <a href="/product"><p style={{color: "green"}}><b>PRODUCTS</b></p></a>
            <a href="/producer"><p style={{color: "green"}}><b>PRODUCERS</b></p></a>
            <a href="/user"><p style={{color: "green"}}><b>USER</b></p></a>
            <a href="/state"><p style={{color: "green"}}><b>STATES</b></p></a>
            <a href="/account"><p style={{color: "orange"}}><b>MANAGE MY ACCOUNT</b></p></a>
          </div>
           
            <div id="adding" style={{textAlign:"center"}}>
           
              <h1 style={{textAlign:"center",color:"purple"}}><u>Category</u></h1>
              <h3 style={{color: "red"}}>Add Category</h3>
              
            <form>
            <label style={{color: "blue"}}>Category</label><br></br>
                <input label="Type" varient="Outlined" fullWidth placeholder="category"
    value={type}
    onChange={(e)=>setType(e.target.value)}>
                </input><br></br><br></br>
                <label style={{color: "blue"}}>Category Type</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="COMMON"
    value={common}
    onChange={(e)=>setCommon(e.target.value)}>
                </input>
                <label style={{color: "blue"}}>Category Material</label><br></br>
                <input label="Common" varient="Outlined" fullWidth placeholder="COMMON"
    value={material}
    onChange={(e)=>setMaterial(e.target.value)}>
                </input>
            </form>
    <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addCategory}>Submit</button>
            </div>
            <div class="deleting"  style={{textAlign:"center"}}>
            <h3 style={{color: "red"}}>Delete Category</h3>
              <form>
                
                <input label="category id" varient="Outlined" fullWidth type="text" placeholder="CAT ID"
                value={categoryId}
                onChange={(e)=>setCategoryId(e.target.value)}>
                </input><br></br>
                <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={deleteCategory}>Delete</button>
              </form>
            </div>
            <div class="shawing" id="showing" >
            
            </div>
        </div>
    );
}

export default Category;