import React, { useEffect, useState } from "react";
import Image1 from './Images/image01.png';
import sri from './Images/sri.jpg';
import './UploadImage.css'
import {storage} from "./Firebase"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"



function UploadImage(){

    const[size , setSize] = useState(40)
    const[logicIns,setLogicIns] = useState(true)
    const[error,setEror] = useState(false)
    const[submit,setSubmit] = useState(false)
    const[errorStringS,setErrorStringS] = useState("")
    const[errorStringE,setErrorStringE] = useState("")
    const[district,setDistrict] = useState("Matara")
    const[contact , setContact] = useState("")
    const[whatsapp , setWhatsapp] = useState("")
    const[address , setAddress] = useState("")
    const[home , setHome] = useState("")
    const[name , setName] = useState("")
    const[email , setEmail] = useState("")
    const[fileUpload,setFileUpload] = useState(null)

    const districts = [{value:"Matara"},{value:"Galle"},{value:"Hambanthota"},{value:"Colombo"},{value:"Gampaha"},{value:"Kaluthara"},{value:"Kandy"},{value:"Nuwaraeliya"},{value:"Matale"},{value:"Badulla"},{value:"Monaragala"},{value:"Ampara"},{value:"Baticlo"},{value:"Trinco"},{value:"Jaffna"},{value:"Mannar"},{value:"Mullaitivu"},{value:"Kilinochchi"},{value:"vavuniya"},{value:"Polonnaruwa"},{value:"Anuradhapura"},{value:"Puttalama"},,{value:"Kurunagala"},{value:"Kegalle"},{value:"Rathnapura"}]

    function onHolder1(){
        setLogicIns(true);
        setEror(false)
    }

    function onHolder2(){
        setLogicIns(false);
        setEror(false)
    }

    function click(){
        alert(district)
    }

    const addFile=(e)=>{
        if(contact==""){
            alert("Enter Contact No")
        }
        else{
            if(fileUpload == null){
                alert("file havent selected")
                return}
                fetch("https://into-uncommon.herokuapp.com/intouncommon/getLastId",{
       
      })
      .then(res=>res.json())
      .then((result)=>{
        const imageRef = ref(storage ,"pending/files"+result)
        uploadBytes(imageRef,fileUpload).then((snapshot)=>{
           // alert("File Submited")
            getDownloadURL(snapshot.ref).then((url) => {
               // console.log(url)
                const pendingProducts = [{url:url}]
                setAddress(home+","+district)
                const pendingProducers = { name:name,contact:contact,whatsapp:whatsapp,address:home+","+district,email:email,pendingProducts}
                fetch("https://into-uncommon.herokuapp.com/intouncommon/addPending",{
              method:"POST",
              headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
              body : JSON.stringify(pendingProducers)
            })
            .then(res=>res.text())
            .then((result2)=>{
               // console.log(result2)
                if(result2==="added"){
                    //alert("Added")
                    setErrorStringE("Your File Is Uploaded , Thank You!")
                    setErrorStringS("ඔබගේ ගොනුව උඩුගත කර ඇත, ස්තූතියි!")
                    setLogicIns(true);
                    setEror(true)
                    setSubmit(true)
                }
                else{
                    setEror(true)
                    setSubmit(false)
                    if(result2==="error contact"){
                        
                        setErrorStringE("Error Contact Type")
                        setErrorStringS("දුරකථන අංකයේ  දෝෂයක් පවතී")
                    }
                    else{
                        if(result2==="empty fields"){
                            setErrorStringE("You are not existing one please fill the full form")
                        setErrorStringS("ඔබ දැනට භාවිතා කල කෙනෙක් නොවේ, කරුණාකර සම්පූර්ණ පෝරමය පුරවන්න")
                           // alert("You are not existing one please fill the full form")
                        }
                        else{
                            setErrorStringE("Error : Retry")
                        setErrorStringS("නැවත උත්සාහ කරන්න")
                           // alert("Error : Retry")
                        }
                    }
                    
                }
            })
        })
      })
           
        })
    } 
}
useEffect(()=>{
    localStorage.removeItem("project")
    },[])
    
    return(
        <div class="main" id="mainF" style={{height:size+"vw"}}>
          <div class="headhome">
              <div className="logo"><img className="imageLogo" src={require("./Images/Logo2.png")}></img></div>
              <h1 className="hometheme"><b>#PRODUCT OF SRILANKA</b></h1>
              <div className="underline1"></div>
              <div className="underline2"></div>
              <p className="text1">RESPONSIBILITY <b>by srilankan inventors</b></p>
              
              <p className="text3"><b>+94 765 233 983</b></p>
              <img className="imagesri" src={sri}></img>
              
          </div>
          <div class="bodyhome">
            <div>
                {error?<div className="instructionHolder" onMouseEnter={onHolder1}>
                    <div>
                        {submit?<div><p style={{color:"Green"}}>{errorStringE}<br></br>{errorStringS}</p></div>:<div><p style={{color:"red"}}>{errorStringE}<br></br>{errorStringS}</p></div>}
                    </div>
                    
                </div>:<div>
                {logicIns?<div className="instructionHolder" onMouseEnter={onHolder2}>
          <p style={{color:"rgb(199,200,161)" , fontSize:"1.04vw"}}>If you are using this service for the first time, please complete the form below,<br></br>Or if you have uploaded your products through this service in the past, it is enough to enter only your phone number that was uploaded.</p>
                <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>ඔබ ප්‍රථම වතාවට මෙම සේවාව භාවිත කරන්නේනම් පහත පෝරමය සම්පුර්ණ කරන්න,<br></br>නැතිනම් ඔබ පෙරවතාවකදීද මෙම සේවාව හරහා ඔබගේ නිෂ්පාදන උඩුගත කර ඇත්නම්, එම උඩුගත කරන ලද ඔබගේ දුරකථන අංකය පමණක් ඇතුලත් කිරීම ප්‍රමාණවත්ය.</p>
        
                <p style={{color:"rgb(199,200,161)", fontSize:"1.04vw"}}>Fill the form and upload the folder with your images and then click the <b>submit all</b> button<br></br><span style={{color:"rgb(251,201,74)"}}>එම පෝරමය පුරවා ඔබගේ පින්තුර සහිත ෆෝල්ඩරය උඩුගත කරන්න ඉන් පසුව <b>submit all</b> බටනය click කරන්න </span></p>
               <br></br>
          </div>:<div onMouseEnter={onHolder1}><p style={{color:"rgb(199,200,161)" , fontSize:"1.04vw"}}>If you are using this service for the first time, please complete the form below,<br></br>Or if you have uploaded your products through this service in the past, it is enough to enter only your phone number that was uploaded.</p>
                <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>ඔබ ප්‍රථම වතාවට මෙම සේවාව භාවිත කරන්නේනම් පහත පෝරමය සම්පුර්ණ කරන්න,<br></br>නැතිනම් ඔබ පෙරවතාවකදීද මෙම සේවාව හරහා ඔබගේ නිෂ්පාදන උඩුගත කර ඇත්නම්, එම උඩුගත කරන ලද ඔබගේ දුරකථන අංකය පමණක් ඇතුලත් කිරීම ප්‍රමාණවත්ය.</p>
        
                <p style={{color:"rgb(199,200,161)", fontSize:"1.04vw"}}>Fill the form and upload the folder with your images and then click the <b>submit all</b> button<br></br><span style={{color:"rgb(251,201,74)"}}>එම පෝරමය පුරවා ඔබගේ පින්තුර සහිත ෆෝල්ඩරය උඩුගත කරන්න ඉන් පසුව <b>submit all</b> බටනය click කරන්න </span></p>
               <br></br></div>}
                    </div>}
            
            </div>
          
            <form>
                <label  className="lable name">Full Name</label><br></br>
                <input placeholder="සම්පුර්ණ නම " className="input input1"
                value={name}
                onChange={(e)=>setName(e.target.value)}></input><br></br>
                <label  className="lable phone">Contact No</label><br></br>
                <input placeholder="දුරකථන අංකය " className="input input2"
                value={contact}
                onChange={(e)=>setContact(e.target.value)}></input><br></br>
                <label  className="lable phone2">WhatsApp No</label><br></br>
                <input placeholder="දුරකථන අංකය " className="input inputw"
                value={whatsapp}
                onChange={(e)=>setWhatsapp(e.target.value)}></input><br></br>
                <label  className="lable address">Address</label><br></br>
                <label  className="lable house">Home Address</label><br></br>
                <input placeholder="ලිපිනය " className="input input3"
                value={home}
                onChange={(e)=>setHome(e.target.value)}></input>
                <label  className="lable district">District</label><br></br>
                <select name="දිස්ත්‍රික්කය" id="district" className="input input4"
                value={district}
                onChange={(e)=>setDistrict(e.target.value)}
                >
                  {districts.map((district)=>(<option value={district.value}>{district.value}</option>))}  
  
 
</select>
                <label  className="lable email">Email</label><p style={{color:"rgb(199,200,161)", fontSize:"1.04vw"}} className="emailMsg">Email is not compulsory,<br></br><span style={{color:"rgb(251,201,74)"}}>විද්‍යුත් තැපෑල අනිවාර්ය නොවේ</span></p>
                <input placeholder="විද්යුත් තැපෑල " className="input input7"></input>
            </form>
            <input type="file"  placeholder="Choose File " className="input input8"
            onChange={(e)=>setFileUpload(e.target.files[0])}></input>
            <button className="button upload" onClick={addFile}><b>SUBMIT ALL</b></button>
          </div>
          
      </div>
       
    )
}

export default UploadImage;