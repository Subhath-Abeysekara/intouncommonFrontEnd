import React, { useEffect, useState } from "react";

function Category(){

    const[type,setType] = useState('')
    const[common,setCommon] = useState(Boolean)
    const[material,setMaterial] = useState('')
    const[categoryId,setCategoryId]=useState(0)
    const[valid,setValid]=useState(false)
    const[categories,setCategories] = useState([])
    const[token , setToken] = useState("")

    function releaseToken(changedToken){

      var token = ""
      var key = "qwerty"
      for(var i =0; i<changedToken.length-6; i++){
        token+=changedToken[i]
      }
    console.log(token)
    setToken(token)
    return token

    }
    const addCategory=(e)=>{
        const category ={type,common,material}
        console.log(category)
        fetch("https://into-uncommon.herokuapp.com/intouncommon/category/add",{
            method:"POST",
            headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":releaseToken(localStorage.getItem("user"))},
            body:JSON.stringify(category)
          })
          .then(res=>res.text())
          .then((result)=>{
            console.log(result)
            var error = "Error username or password"
            if(result==error){
              window.location="/"
            }
          else{
            window.location="/category"
          }
          })
        }

        function logOut(){
          localStorage.removeItem("user");
          window.location="/"
        }

        function showCats(){
          fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
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
        }

        const deleteCategory=(e)=>{
          console.log(categoryId)
          fetch("https://into-uncommon.herokuapp.com/intouncommon/category/delete?id="+categoryId,{
            method:"DELETE",
            headers:{"header":releaseToken(localStorage.getItem("user"))}
          })
          .then(res=>res.text)
          .then((result)=>{
            var error = ""
            alert(result)
            console.log(result)
        if(result==error){
          window.location="/"
        }
      else{
        window.location="/category"
      }        
    })
        }
    useEffect(()=>{
      if(!valid){
        console.log(valid)
        console.log("token ",token )
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
          console.log(localStorage.getItem("user"))
        localStorage.removeItem("userId")
              localStorage.removeItem("name")
              localStorage.removeItem("password")
              localStorage.removeItem("email")
              localStorage.removeItem("contact")
              localStorage.removeItem("updateCondition")
        
      
      },[])

    return(
        <div>
          {valid?<div>
          <div class="links" style={{textAlign:"right"}}>
          <a href="/product"><p style={{color: "green"}}><b>PRODUCTS</b></p></a>
            <a href="/producer"><p style={{color: "green"}}><b>PRODUCERS</b></p></a>
            <a href="/user"><p style={{color: "green"}}><b>USER</b></p></a>
            <a href="/state"><p style={{color: "green"}}><b>STATES</b></p></a>
            <a href="/account"><p style={{color: "orange"}}><b>MANAGE MY ACCOUNT</b></p></a>
          </div>
           <div style={{textAlign:"left" , top:0}}>
            <button onClick={logOut}>SIGN OUT</button><br></br>
            <button onClick={showCats}>SHOW CATEGORIES</button>
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
                </input><br></br><br></br>
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
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    );
}

export default Category;