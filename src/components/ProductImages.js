import React, { useEffect, useState } from "react";
import {storage} from "./Firebase"
import "./image.css"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
function ProductImages(){

    const[imageUpload,setImageUpload] = useState(null)
    const[imageList,setImageList] = useState([])
    const[urls,setUrls] = useState([])
    const[id,setId] = useState(localStorage.getItem("id"))
    const[valid,setValid]=useState(false)

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


    const enterId=(e)=>{
        fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducts",{
            headers:{"header":releaseToken(localStorage.getItem("user"))}
          })
          .then(res=>res.json())
          .then((result)=>{
            console.log(result)
          var i =0
          for(i=0;i<result.length;i++){
              if(result[i].id=id){
                  localStorage.setItem("id",id)
                  alert(localStorage.getItem("id"))
                  return
              }
        }

        alert("Error id: Enter Again Correctly")
             
    })
    }

    const addImage=(e)=>{
        if(localStorage.getItem("id")==null){
            alert("Enter Id First")
        }
        else{
            if(imageUpload == null){
                alert("image havent selected")
                return}
                fetch("https://into-uncommon.herokuapp.com/intouncommon/getAmount?id="+localStorage.getItem("id"),{
        headers:{"header":releaseToken(localStorage.getItem("user"))}
      })
      .then(res=>res.json())
      .then((result)=>{
        const imageRef = ref(storage ,"product"+id+"/image"+result+1)
        uploadBytes(imageRef,imageUpload).then((snapshot)=>{
            alert("submited")
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
                const productImages = {url}
                const productImageDTO = {productId : id , productImages}
                fetch("https://into-uncommon.herokuapp.com/intouncommon/product/url/add",{
              method:"POST",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":releaseToken(localStorage.getItem("user"))},
              body : JSON.stringify(productImageDTO)
            })
            .then(res=>res.text())
            .then((result2)=>{
                if(result2==="added"){
                    alert("Added")
                }
                else{
                    alert("Error : Retry")
                }
            })
        })
        fetch("https://into-uncommon.herokuapp.com/intouncommon/addAmount?id="+localStorage.getItem("id")+"&"+"amount="+result+1,{
              method:"PUT",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*","header":releaseToken(localStorage.getItem("user"))},
            })
            .then(res=>res.text())
            .then((result2)=>{})
      })
           
        })
    } 
}

function showProducts(){
    fetch("https://into-uncommon.herokuapp.com/intouncommon/getproducts",{
          headers:{"header":releaseToken(localStorage.getItem("user"))}
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
          if(result[i].amount===0){
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
         
      }
      string+="</ul>"
      console.log(string)
      frame.innerHTML = string
           
  })
}

function showImages(){
    if(localStorage.getItem("id")==null){

    }
    else{
        listAll(ref(storage,"product"+id+"/")).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setImageList((prev)=>[...prev,url])
                    localStorage.setItem("imageCount",imageList.length)
                    alert(localStorage.getItem("imageCount"))
                })
            })
        })
    }
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
        
   
    } , [])
    return(
        <div>
            {valid?<div style={{textAlign:"center"}}><h2 style={{color: "purple"}}><u>Image Uploader</u></h2>
            <div style={{textAlign:"left" , top:0}}>
            <button onClick={showProducts}>SHOW PRODUCTS</button><br></br>
            <button onClick={showImages}>SHOW IMAGES</button>
           </div>
        <div class="getid"  style={{textAlign:"center"}}>
      <h3 style={{color: "red"}}>Enter Id</h3>
        <form>
          
          <input label="product id" varient="Outlined" fullWidth type="text" placeholder="Product ID"
          value={id}
          onChange={(e)=>setId(e.target.value)}>
          </input><br></br>
         
       <br></br>
        </form>
        <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={enterId}>ENTER</button>
      </div>
      <br></br>
            <div style={{textAlign:"center"}}>
              <input type="file" 
              onChange={(e)=>setImageUpload(e.target.files[0])}></input><br></br>
              <button style={{color: "white",background:"black"}} variant='contained' color = 'secondary' onClick={addImage}>SubmitImage</button>
            </div>
            <div class="showimages">
                {imageList.map((url)=>{
                    return <img src={url} />
                })}
            </div>
            <div id="showing"></div>
        </div>:<div><h2>Log In First</h2></div>}
        </div>
    )
}

export default ProductImages