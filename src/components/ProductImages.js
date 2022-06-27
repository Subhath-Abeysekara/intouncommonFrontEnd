import React, { useEffect, useState } from "react";
import {storage} from "./Firebase"
import "./image.css"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
function ProductImages(){

    const[imageUpload,setImageUpload] = useState(null)
    const[imageList,setImageList] = useState([])
    const[urls,setUrls] = useState([])
    const[id,setId] = useState(localStorage.getItem("id"))

    const enterId=(e)=>{
        fetch("http://localhost:8080/intouncommon/getproducts",{
            headers:{"header":localStorage.getItem("user")}
          })
          .then(res=>res.json())
          .then((result)=>{
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
                fetch("http://localhost:8080/intouncommon/getAmount?id="+localStorage.getItem("id"),{
        headers:{"header":localStorage.getItem("user")}
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
                fetch("http://localhost:8080/intouncommon/product/url/add",{
              method:"POST",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
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
        fetch("http://localhost:8080/intouncommon/addAmount?id="+localStorage.getItem("id")+"&"+"amount="+result+1,{
              method:"PUT",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
            })
            .then(res=>res.text())
            .then((result2)=>{})
      })
           
        })
    }
}

    useEffect(()=>{
        fetch("http://localhost:8080/intouncommon/getproducts",{
            headers:{"header":localStorage.getItem("user")}
          })
          .then(res=>res.json())
          .then((result)=>{
          var string="<h3 style='color:red;'>Available Products</h3><ul>"
          var frame = document.getElementById("showing")
          var i =0
          for(i=0;i<result.length;i++){
            string+="<li><p>ID : "+result[i].id+"<br></br>PRODUCT : "+result[i].category.type+"<br></br>COMMON : "+result[i].category.common+"<br></br>USES : "+result[i].uses+"<br></br>SPECIAL DETAILS : "+result[i].specialData+"<br></br>PRIMARY DETAILS : "+result[i].primaryData+"<br></br>PRODUCER : "+result[i].producer.name+"<br></br>STATE CODE : "+result[i].statecodes.state_type+"</p></li>"
        }
        string+="</ul>"
        frame.innerHTML = string
             
    })

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
    } , [])
    return(
        <div style={{textAlign:"center"}}><h2 style={{color: "purple"}}><u>Image Uploader</u></h2>
        <div class="getid"  style={{textAlign:"center"}}>
      <h3 style={{color: "red"}}>Enter Id</h3>
        <form>
          
          <input label="product id" varient="Outlined" fullWidth type="text" placeholder="Product ID"
          value={id}
          onChange={(e)=>setId(e.target.value)}>
          </input><br></br>
          <button style={{color: "white",background:"black"}}  variant='contained' color = 'secondary' onClick={enterId}>ENTER</button>
       <br></br>
        </form>
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
        </div>
    )
}

export default ProductImages