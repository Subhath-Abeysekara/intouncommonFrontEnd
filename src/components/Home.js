import React, { useEffect, useState } from "react";
import CommonProducts from "./CommonProduct";
import {link} from 'react-router';
import Image1 from './Images/image01.png';
import ImageIcode from './Images/icode3.png';
import sri from './Images/sri.jpg';

import './Home.css';
import ImageContainer from "./ImageContainer";


function Home(){

    const[conditionCommon,setConditionCommon]= useState(false)
    const[conditionUncommon,setConditionUncoomn]= useState(true)
    const[conditionProject,setConditionProject]= useState(false)
    const[category,setCategory]= useState([])
    const[commonCategory , setCommon] = useState([])
    const[uncommonCategory , setUncommon] = useState([])
    const[size , setSize] = useState(40)
    const[bottom , setBottom] = useState(3)
    
    // const[frame , setFrame] = useState(false)
    // const[sizeCom , setSizeCom] = useState(0)

    const projects = [{id:1,project : "inventor",caption:"Join as a inventor with intouncommon"},{id:2,project : "designer",caption:"Join as a designer with intouncommon"},{id:3,project : "Register",caption:"request for register as a producer"},{id:4,project : "Upload",caption:"upload your product to website"}]

    const addImage=(n)=>{
        var x = document.getElementById("images")
        var index = localStorage.getItem("i")
        var i = parseInt(index)
        i=i+1
        if(i>1){
            i=0
        }
        localStorage.setItem("i",i)
        alert(localStorage.getItem("i"))
        //x.src = images[i]
    }

    function create(){
      window.location="/createBy"
    }

      const uncommonClick=(e)=>{

       
        // var mainframe = document.getElementById("mainF")
        // var profile = document.getElementById("profile")
        //setSizeUn(uncommonCategory.length * 7+20)
        //
       // var sizeUn = uncommonCategory.length*7+20
       // console.log("size" + sizeUn)
        // if(sizeUn>=87){
        //   //setFrame(true)
        //   var bottom = sizeUn -105
        //   bottom = bottom*100/86
        //   bottom=bottom-2
        //   profile.style.bottom = -bottom+"%"
        // }
       
       // mainframe.style.height = sizeUn+"vh"
       if(conditionUncommon){
        setConditionUncoomn(false)
        setSize(40)
        setBottom(3)
              }
      else{
        setConditionUncoomn(true)
        var sizz = uncommonCategory.length

        
          setSize(uncommonCategory.length*3+20)
          console.log("size "+sizz + " length "+ uncommonCategory.length)
          if(uncommonCategory.length*3>=40){
            //setFrame(true)
            var botto = uncommonCategory.length*3+20 -50
            botto = botto*100/40
           // botto=botto-2
            setBottom(-botto)
            console.log("bottom "+botto)
            //profile.style.bottom = -bottom+"%"
          }
          else{
            setBottom(3)
          }
        
        console.log(category)
        console.log("uncom "+uncommonCategory)
      
      }
       setConditionProject(false)
    setConditionCommon(false)
    
  }

  

  
  const commonClick=(e)=>{

    
        
        if(conditionCommon){
          setConditionCommon(false)
          setSize(40)
        setBottom(3)
                }
        else{
          setConditionCommon(true)
          var sizz = commonCategory.length*3+20
        
          setSize(commonCategory.length*3+20)
          console.log("size "+sizz + "length "+ commonCategory.length)
          if(commonCategory.length*3>=40){
            //setFrame(true)
            var botto = commonCategory.length*3+20 -50
            botto = botto*100/40
           // botto=botto-2
            setBottom(-botto)
            console.log("bottom "+botto)
            //profile.style.bottom = -bottom+"%"
          
        }
        else{
          setBottom(3)
        }
        
        }
    
    setConditionProject(false);
    setConditionUncoomn(false);
    console.log(category)
    console.log("com "+ commonCategory)
    // var mainframe = document.getElementById("mainF")
    //     var profile = document.getElementById("profile")
        
    //     var sizeCom = commonCategory.length * 7+20
    //             console.log("size" + sizeCom)
    //     if(sizeCom>=87){
    //       var bottom = sizeCom -100
    //       bottom = bottom*100/86
    //       bottom=bottom-3
    //       profile.style.bottom = -bottom+"%"
    //     }
       
    //     mainframe.style.height = sizeCom+"vh"
  }


  const uncommonLoad=(catID)=>{
    console.log(catID)
    localStorage.setItem("catId",catID)
    window.location = "/uncommon2"
  }

  const commonLoad=(catID)=>{
    console.log(catID)
    localStorage.setItem("catId",catID)
    window.location = "/common2"
  }

  const projectLoad=(catID)=>{
    console.log(catID)
    localStorage.setItem("project",catID);
    if(catID===3){
      window.location="/register"
    }
    else{
      if(catID===4){
        window.location="/uploadimages"

      }
      else{
        window.location = "/project"

      }
    }
      
  }


  const projectClick=(e)=>{
    e.preventDefault()
    if(conditionProject){
      setConditionProject(false)
    }
    else{
      setConditionProject(true);
      setSize(40)
        setBottom(3)
    }
    setConditionUncoomn(false);
    setConditionCommon(false)
  }
  
  useEffect(()=>{
      localStorage.removeItem("user")
      fetch("https://into-uncommon.herokuapp.com/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
          console.log("cats ",result)
            setCategory(result)
            if(result !==null){

        var uncopy=[];
        var comcopy=[];
                  console.log(result)
        
                  var j=0;
                  var k=0
                  for(let i=0; i<result.length; i++){
                    if(result[i].common===false){
                        uncopy[j]=result[i]
                        j++
                    }
                    else{
                        comcopy[k]=result[i]
                        k++
                    }
                  }
                  const common = category.filter(({common}) => {
                    return common === true
                  });
                  console.log("com"+common)
                  setCommon(comcopy)
                  //setSizeCom(commonCategory.length * 6+20)
                  const unncommon = result.filter(() => {
                    return result.common === false
                  });
                  console.log("uncom"+uncopy)
                  setUncommon(uncopy)
                  var sizz = uncopy.length*3+30

        if(size<=sizz){
          setSize(uncopy.length*3+20)
          console.log("size "+sizz + "length "+ uncopy.length)
          if(uncopy.length*3>=40){
            //setFrame(true)
            var botto = uncopy.length*3+20-50
            botto = botto*100/40
           // botto=botto-2
            setBottom(-botto)
            console.log("bottom "+botto)
            //profile.style.bottom = -bottom+"%"
          }
        }
                  
            }
        })
  },[])

    return(
        <div>
          {commonCategory.length!=0||uncommonCategory.length!=0?
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
          <a href="/login"><div class="loginink"><p style={{color: "rgb(109, 108, 108)"}}>Admin Login</p></div></a>
              <div className="topics">
              <div className="uncommonProductHead"><p className="text0"  onMouseEnter={uncommonClick}><span>UNCommon</span> PRODUCTS</p></div>
              <div>
              {conditionUncommon?<div className="uncommonProduct">
                  {uncommonCategory.map((cat)=>(
                      <div className="LinkHolder" id="linkU"><p className="text00" onClick={()=>uncommonLoad(cat.categoryId)} style={{color:"rgb(251,201,74)"}}><b style={{textTransform:"uppercase" , color:"rgb(199,200,161)"}}>{cat.type} - </b><span style={{top:"25%"}}>{cat.material}</span></p></div>
                  ))}
              </div>:<div></div>}
              </div>
              <div className="commonProductHead"><p className="text0" onMouseEnter={commonClick}><span >Common</span> PRODUCTS</p></div>
              <div>
              {conditionCommon?<div className="commonProduct">
                  {commonCategory.map((cat)=>(
                      <div className="LinkHolder" ><p className="text00" onClick={()=>commonLoad(cat.categoryId)} style={{color:"rgb(251,201,74)"}}><b style={{textTransform:"uppercase" , color:"rgb(199,200,161)"}}>{cat.type} - </b>{cat.material}</p></div>
                  ))}
              </div>:<div></div>}
              </div>
              <div className="uncommonProjectHead" id="id3"><p className="text0" onMouseEnter={projectClick}>Interested in UNCommon</p></div>
              <div>
              {conditionProject?<div className="uncommonProject">
                  {projects.map((cat)=>(
                      <div className="LinkHolder" ><p className="text00" onClick={()=>projectLoad(cat.id)} style={{color:"rgb(111,129,227)" , opacity:"76%"}}><b style={{textTransform:"uppercase" , color:"rgb(241,63,181)", opacity:"100%"}}>{cat.project} - </b>{cat.caption}</p></div>
                  ))}
              </div>:<div></div>}
              </div>
              
              </div>
               <div className="addHolder">
                  <img className="image" src={Image1}></img>
                  <ImageContainer></ImageContainer>
              </div>
              <div className="cover"></div>
              
              
          </div>
          
          <div className="footer" ><p className="createrTopic">#ALLForweb</p></div>
          <div className="creater" onMouseLeave={create}><img className="icode" src={ImageIcode}></img></div>
          
      </div>:<div>
                <h2 style={{color: "rgb(109, 108, 108)" , fontSize:"2vw"}}>Loading</h2>
                <p style={{color: "rgb(109, 108, 108)" , fontSize:"0.8vw"}}>your uncommon world</p>
                </div>
          }
        </div>
       
    );
}

export default Home;