import React, { useEffect, useState } from "react";
import Image1 from './Images/image01.png';
import sri from './Images/sri.jpg';
import './UploadImage.css'
import {storage} from "./Firebase"
import {ref , uploadBytes , listAll, getDownloadURL} from "firebase/storage"
import './Register.css'



function Registration(){

    const[size , setSize] = useState(96)
    const[logicIns,setLogicIns] = useState(true)
    const[error,setEror] = useState(false)
    const[submit,setSubmit] = useState(false)
    const[errorStringS,setErrorStringS] = useState("")
    const[errorStringE,setErrorStringE] = useState("")
    const[district,setDistrict] = useState("Matara")
    const[contact , setContact] = useState("")
    const[whatsapp , setWhatsapp] = useState("")
    const[nicNo , setNicNo] = useState("")
    const[address , setAddress] = useState("")
    const[home , setHome] = useState("")
    const[name , setName] = useState("")
    const[email , setEmail] = useState("")
    const[nic1,setNic1] = useState(null)
    const[nic2,setNic2] = useState(null)
    const[agree , setAgree] = useState(false);


    const districts = [{value:"Matara"},{value:"Galle"},{value:"Hambanthota"},{value:"Colombo"},{value:"Gampaha"},{value:"Kaluthara"},{value:"Kandy"},{value:"Nuwaraeliya"},{value:"Matale"},{value:"Badulla"},{value:"Monaragala"},{value:"Ampara"},{value:"Baticlo"},{value:"Trinco"},{value:"Jaffna"},{value:"Mannar"},{value:"Mullaitivu"},{value:"Kilinochchi"},{value:"vavuniya"},{value:"Polonnaruwa"},{value:"Anuradhapura"},{value:"Puttalama"},,{value:"Kurunagala"},{value:"Kegalle"},{value:"Rathnapura"}]

    function onHolder1(){
        setLogicIns(true);
        setEror(false)
    }

    function notAgree(){
        window.location="/"
      }

      function agreeMent(){
        setAgree(true);
      }

    function onHolder2(){
        setLogicIns(false);
        setEror(false)
    }

    function click(){
        alert(district)
    }

    const addFile=(e)=>{
        if(contact==""||whatsapp==""||home==""||nicNo==""){
            alert("Please Complete The Full Form / කරුණාකර සම්පූර්ණ පෝරමය සම්පූර්ණ කරන්න")
        }
        else{
            if(nic1 == null || nic2 ==null){
                alert("Please add two id card images / කරුණාකර හැඳුනුම්පත් රූප 2ක එක් කරන්න")
                return}
                fetch("https://into-uncommon.herokuapp.com/intouncommon/getRequestLastId",{
       
      })
      .then(res=>res.json())
      .then((result)=>{
       // alert(result)
        const imageRef = ref(storage ,"request/files"+result)
        uploadBytes(imageRef,nic1).then((snapshot)=>{
           // alert("File Submited")
            getDownloadURL(snapshot.ref).then((url) => {
               // console.log(url)
                const nicUrl1 = url
                //alert(nicUrl1)
                result+=1
                //alert(result)
                const imageRef2 = ref(storage ,"request/files"+result)
                uploadBytes(imageRef2,nic2).then((snapshot)=>{
                   // alert("File Submited")
                    getDownloadURL(snapshot.ref).then((url3) => {
                        //alert(url3)
                        const nicUrl2 = url3
                        //alert(nicUrl2)
                        setAddress(home+","+district)
                        const requestedProducers = { name:name,contact:contact,whatsApp:whatsapp,basicDetails:home+","+district,nicNo:nicNo,email:email,nicUrl1,nicUrl2}
                        fetch("https://into-uncommon.herokuapp.com/intouncommon/addRequest",{
                      method:"POST",
                      headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"},
                      body : JSON.stringify(requestedProducers)
                    })
                    .then(res=>res.text())
                    .then((result2)=>{
                        //alert(result2)
                        if(result2==="added"){
                            //alert("Added")
                            setErrorStringE("Your File Is Uploaded , Thank You!")
                            setErrorStringS("ඔබගේ ගොනුව උඩුගත කර ඇත, ස්තූතියි!")
                            alert("Registration Request Added / ලියාපදිංචි කිරීමේ ඉල්ලීම එකතු කරන ලදී");
                            setLogicIns(true);
                            setEror(true)
                            setSubmit(true)
                        }
                        else{
                            setEror(true)
                            setSubmit(false)
                            alert("error")
                            setErrorStringE("You are not existing one please upload your product images first")
                                setErrorStringS("ඔබ දැනට භාවිතා කල කෙනෙක් නොවේ, කරුණාකර පළමුව ඔබේ නිෂ්පාදන පින්තූර උඩුගත කරන්න")
                            
                        }
                    })
                    })
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
       <div>
        {agree? <div class="main" id="mainF" style={{height:40+"vw"}}>
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
          <p style={{color:"rgb(199,200,161)" , fontSize:"1.04vw"}}>In order to register through this service,<br></br> it is mandatory that you have previously uploaded images of your products through the picture upload service using the phone number you enter here<br></br>and have been approved by the organization for registration</p>
                <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>මෙම සේවාව ඔස්සේ ලියාපදිංචි වීම සඳහා ඔබ විසින් <br></br> මෙහි ඇතුලත් කරනු ලබන දුරකථන අංකය ඔස්සේ මිට පෙර අවස්ථාවක පින්තූර උඩුගත කිරීමේ සේවාව ඔස්සේ තම නිෂ්පාදනවල පින්තුර උඩුගත කර<br></br>ආයතනය විසින් ඔබව ලියාපදිංචි වීම සඳහා අනුමත කර තිබිය යුතු වීම අනිවාර්ය වේ</p>
        
                
          </div>:<div onMouseEnter={onHolder1}> <p style={{color:"rgb(199,200,161)" , fontSize:"1.04vw"}}>In order to register through this service,<br></br> it is mandatory that you have previously uploaded images of your products through the picture upload service using the phone number you enter here<br></br>and have been approved by the organization for registration</p>
                <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>මෙම සේවාව ඔස්සේ ලියාපදිංචි වීම සඳහා ඔබ විසින් <br></br> මෙහි ඇතුලත් කරනු ලබන දුරකථන අංකය ඔස්සේ මිට පෙර අවස්ථාවක පින්තූර උඩුගත කිරීමේ සේවාව ඔස්සේ තම නිෂ්පාදනවල පින්තුර උඩුගත කර<br></br>ආයතනය විසින් ඔබව ලියාපදිංචි වීම සඳහා අනුමත කර තිබිය යුතු වීම අනිවාර්ය වේ</p>
        
                </div>}
                    </div>}
            
            </div>
          
            <form>
                <label  className="lable name">Full Name</label><br></br>
                <input placeholder="සම්පුර්ණ නම " className="input input1" required
                value={name}
                onChange={(e)=>setName(e.target.value)}></input><br></br>
                <label  className="lable phone">Contact No</label><br></br>
                <input placeholder="දුරකථන අංකය " className="input input2" required
                value={contact}
                onChange={(e)=>setContact(e.target.value)}></input><br></br>
                <label  className="lable phone2">WhatsApp No</label><br></br>
                <input placeholder="දුරකථන අංකය " className="input inputw" required
                value={whatsapp}
                onChange={(e)=>setWhatsapp(e.target.value)}></input><br></br>
                <label  className="lable address">Address</label><br></br>
                <label  className="lable house">Home Address</label><br></br>
                <input placeholder="ලිපිනය " className="input input3" required
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

                <label  className="lable nic">Nic No</label><br></br>
                <input placeholder="ජාතික හැදුනුම්පත් අංකය" className="input inputnic" required
                value={nicNo}
                onChange={(e)=>setNicNo(e.target.value)}></input>
            </form>
            <label  className="lable lablenic1">Front image of ID card / හැදුනුම්පතෙහි ඉදිරිපස පින්තුරය</label><br></br>
            <input type="file"  placeholder="Choose File " className="input nic1"
            onChange={(e)=>setNic1(e.target.files[0])}></input>
            <label  className="lable lablenic2">Back image of ID card / හැදුනුම්පතෙහි පිටුපස පින්තුරය</label><br></br>
            <input type="file"  placeholder="Choose File " className="input nic2"
            onChange={(e)=>setNic2(e.target.files[0])}></input>
            <button className="button register" onClick={addFile}><b>SUBMIT ALL</b></button>
          </div>
          
      </div>:<div class="main" id="mainF" style={{height:size+"vw"}}>
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
            <p style={{color:"white" , fontSize:"1.04vw"}}>01 - It should be known that a promotion period of at least 4 months is necessary to create customer attention to your products and to familiarize yourself with new product processing</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>02 - You have to develop new and different products for our company with your manufacturing capability</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>03 - As usual, we have set up methods for the products you process and for promotions and sales</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>04 - Our company will charge you a service fee during your product promotion period to cover the cost of phone calls, photo processing and graphic design, computer data handling, additional product promotion activities, correspondence and postage</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>05 - It should be known that this service is only a service that contributes to introduce talented producers to the market, about new market opportunities, about product promotion, about product innovation</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>06 - From time to time, our company may enter into agreements related to the various tasks carried out with you</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>07 - If you fail to prepare the products as required by our company during the 4 month promotion period, the free registration period will be extended for another month based on your results</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>08 - For the products that you create and manufacture yourself, you can present the products for sale through your own brand.
<br></br> But the products made based on the ideas and designs provided by our company are offered for sale under the uncommon brand</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>09 - Products you design and manufacture can also be offered for sale under our uncommon brand</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>10 - Products you process are subject to all after-sales services provided by our company to our customers.</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>11 - We always put our customers first. For that, you must also agree to the decisions we take from product development to sales</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>12 - The 10th and 11th points are not relevant when selling the products that you process through us, and if they are also sold under the uncommon brand, those points will be valid</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>13 - We can create a very good market for you through the preparation of modern products that are always required by the market</p>
            <p style={{color:"white" , fontSize:"1.04vw"}}>14 - The Company may introduce or withdraw conditions in certain future operations.</p>
            <p style={{color:"wheat" , fontSize:"1.04vw"}}>*** If someone says that there is no market for domestic decorative and decorative products, it is true. The reason for that is that we have not updated our products in English or innovated in Sinhala, unless we came to a uniform arrangement for many years.
Look, China was able to export their broom, but do we even have our broom at home?
Think where the fault lies,
Join the trip to the market!</p>
<br></br>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>01 - ඔබගේ නිශ්පාදන වෙත පාරිභෝගික අවධානය ඇති කිරීම සදහාත්නව නිශ්පාදන සැකසීමට ඔබව හුරු කිරීමටත් අවම මාස 4ක ප්‍රවර්ධන කාලයක් අවශ්‍ය බව දැනගත යුතුය</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>02 - ඔබගේ නිශ්පාදන හැකියාව මගින් අතිශය නව සහ වෙනස් නිශ්පාදන ඔබ අප ආයතනය වෙත සැකසිය යුතුය.</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>03 - සුපුරුදු ලෙස ඔබ සකසන නිශ්පාදන සදහාද ප්‍රවර්ධන සහ අලෙවිය සදහාද අප ක්‍රමවේද සකසා ඇත</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>04 - අප ආයතනය මගින් ඔබගෙන් සේවා ගාස්තුවක් අය කරනුයේ ඔබගේ නිශ්පාදන ප්‍රවර්ධන කාලය තුලදී ඔබ වෙනුවෙන් අප ආයතනය දරන දුරකථන ඇමතුම්, ඡායාරූප සැකසීම හා graphic නිර්මාණ , පරිඝණක දත්ත හැසිරවීම, අමතර නිශ්පාදන ප්‍රවර්ධන කටයුතු , ලිපිලේඛන හා තැපැල් ගාස්තු යන සේවාවන් වෙනුවෙන් වැයවන වියදම ආවරණය වීම සදහා ය</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>05 - මෙම සේවාව නව වෙළෙඳපොළ අවස්තාවන් පිලිබදව, නිශ්පාදන ප්‍රවර්ධනය පිළිබඳව, නිශ්පාදන නවීකරණය පිළිබඳව, අවබෝධය අඩු දක්ශ නිශ්පාදකයන් වෙළෙඳපොළ වෙත හදුන්වාදීම සදහා දායකත්වය දක්වන සේවාවක්ම පමණක් බව දැනගත යුතුය</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>06 - අප ආයතනය මගින් විටින් විට ඔබ සමග සිදු කරනු ලබන විවිධ කාර්‍යන් වලදී ඒවාට අදාලව ගිවිසුම් ගතවීම් සිදුවිය හැකිය</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>07 - අප ආයතනයට අවශ්‍ය පරිදි නිශ්පාදන සැකසීමට මාස 4ක ප්‍රවර්ධන කාලය තුලදී ඔබ අපොහොසත් වුවහොත් ඒ කාලය වනවිට ඔබගේ ප්‍රතිඵල මත තවත් මාසයක කාලයක් නොමිලේ ලියාපදිංචි කාලය දීර්ඝ කරනු ලබයි</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>08 - ඔබ විසින්ම නිර්මාණය කර නිශ්පාදනය කරන නිශ්පාදන සදහා ඔබට අවශ්‍ය ඔබගේ සන්නාමයක් ඔස්සේ නිශ්පාදන අලෙවියට ඉදිරිපත් කල හැක. 
<br></br>නමුත් අප ආයතනය ලබාදෙන අදහස් හා නිර්මාණ මත සිදු කරන නිශ්පාදන uncommon සන්නාමය යටතේ අලෙවියට ඉදිරිපත් වෙයි</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>09 - අපගේ uncommon සන්නාමය යටතේද ඔබ විසින් නිර්මාණය කර නිශ්පාදනය කරන නිශ්පාදන අලෙවියට ඉදිරිපත් කල හැක</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>10 - අප ආයතනය විසින් අපගේ පාරිභෝගිකයන් වෙත ලබා දෙන අලවියට පසු සේවාවන් සියල්ලටම ඔබ සකසන නිශ්පාදනද යටත් වෙයි</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>11 - අප නිරන්තරයෙන් ප්‍රමුඛත්වය ලබා දෙන්නේ අපගේ පාරිභෝගිකයන් වෙතයි. ඒ වෙනුවෙන් නිශ්පාදන සැකසීමේ සිට අලෙවිය දක්වා අප ගන්නා තීරණ සදහා ඔබද එකග විය යුතුය</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>12 - මේ වන විට ඔබ සකසන නිශ්පාදන අප හරහා අලෙවි කිරීමේදී  10 සහ 11 වන කාරණා අදාල නොවන අතර ඒවාද uncommon සන්නාමය යටතේ අලෙවි වනවා නම් ඒ කාරණා වලංගු වෙයි</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>13 - සෑමවිටම වෙළෙඳපොළට අවශ්‍ය නවීන නිශ්පාදන සැකසීම තුලින් ඔබවෙත ඉතා හොඳ වෙළෙඳපොළක් අප ආයතනය තුලින් සකසා ගත හැක</p>
            <p style={{color:"rgb(251,201,74)", fontSize:"1.04vw"}}>14 - අනාගතයේ සිදු කරන යම් යම් කාර්‍ය වලදී ආයතනය මගින් කොන්දේසි ඉදිරිපත් කිරීම් හෝ ඉවත් කිරීම් සිදු කල හැක.</p>
            <p  style={{color:"rgb(251,250,85)", fontSize:"1.04vw"}}> *** කවුරුහරි කියනවනම් දේශීය විසිතුරු සහ අලංකරණ නිශ්පාදනවලට දේශීයව හා විදේශීයව වෙළෙඳපොළක් නෑ කියලා ඒක ඇත්ත. ඒකට හේතුව තමයි අපි අවුරුදු ගනණාවක් පුරාවටම ඒකාකාරී පිළිවෙලකටම ආවා මිස අපි අපේ නිශ්පාදන ඉංග්‍රීසියෙන් UPDATE වත් සිංහලෙන් නව්‍යකරණයවත් කරපු නැති එක. 
බලන්න, චීනයට පුලුවන් වුනා එයාලගෙ කොස්සත් අපනයනය කරන්න, නමුත් අපේ කොස්ස අපේ ගෙදරවත් තියනවද? 
හිතන්න වරද කොතනද කියලා, 
එකතු වෙන්න අන්න ඒ වෙළෙඳපොළට යන ගමනට !</p>
          <button onClick={agreeMent} style={{background:"green" , color:"black"}}>Agree / එකඟයි</button>
          <button onClick={notAgree} style={{background:"red" , color:"black"}}>Disagree / එකඟ නැත</button>
        </div>
          </div>
          
      </div>}
       </div>
       
    )
}

export default Registration;