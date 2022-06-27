import React, { useEffect } from "react";
import CommonProducts from "./CommonProduct";
import {link} from 'react-router';
import Image1 from './Images/add.jpg';
import Image2 from './Images/add2.png';
import './Home.css';
import ImageContainer from "./ImageContainer";


function Home(){
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

      const uncommonClick=(e)=>{
    e.preventDefault()
    console.log("hello")
    fetch("http://localhost:8080/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
            var frame = document.getElementById("id1")
            var string = ""
            var i=0
    var topl = 20
            for(i=0;i<result.length;i++){
                if(result[i].common==false){
                    string+="<a href='/uncommon/:"+result[i].categoryId+"' ><p class='text00' style='top:"+topl+"px;'}>"+result[i].type+"</p></a>"
                    topl+=20
                }
                
            }
            frame.innerHTML=string
        })
    
  }

  const commonClick=(e)=>{
    e.preventDefault()
    console.log("hello")
    fetch("http://localhost:8080/intouncommon/getcategories",{
          headers:{"header":localStorage.getItem("user")}
        })
        .then(res=>res.json())
        .then((result)=>{
            var frame = document.getElementById("id2")
            var string = ""
            var i=0
    var topl = 20
            for(i=0;i<result.length;i++){
                if(result[i].common==true){
                    string+="<a href='/common2/:"+result[i].categoryId+"' ><p class='text00' style='top:"+topl+"px;'}>"+result[i].type+"</p></a>"
                    topl+=20
                }
                
            }
            frame.innerHTML=string
        })
    
    
   
  }

  const projectClick=(e)=>{
    e.preventDefault()
    console.log("hello")
    var frame = document.getElementById("id3")
    var string = ""
    var strings = []
    strings[0]="Project 1"
    strings[1]="project 2"
    var i=0
    var topl = 20
    for(i=0;i<strings.length;i++){
        string+="<a href='/common2/:"+i+"' ><p class='text00' style='top:"+topl+"px;'}>"+strings[i]+"</p></a>"
        topl+=20
    }
    frame.innerHTML=string
  }
  useEffect(()=>{
      localStorage.removeItem("user")
      
  },[])

    return(
        <div class="main">
            <div class="headhome">
                <div className="logo"><img className="imageLogo" src={require("./Images/Logo2.png")}></img></div>
                <h1 className="hometheme"><b>MADE IN SRI LANKA</b></h1>
                <div className="underline1"></div>
                <div className="underline2"></div>
                <p className="text1">RESPONSIBILITY <b>by srilankan inventors</b></p>
                <p className="text2"><b>227/28, HIGHLEVEL ROAD, NUGEGODA, SRI LANKA</b></p>
                <p className="text3"><b>+94 765 233 983</b></p>
                <a href="/login"><div class="loginink"><p style={{color: "white"}}>SIGN IN</p></div></a>
            </div>
            <div class="bodyhome">
                <div className="uncommonProduct" id="id1"><p className="text0" onClick={uncommonClick}>UNCOMMON PRODUCTS</p></div>
                <div className="commonProduct" id="id2"><p className="text0" onClick={commonClick}>COMMON PRODUCTS</p></div>
                <div className="uncommonProject" id="id3"><p className="text0" onClick={projectClick}>UNCOMMON PROJECTS</p></div>
                <div className="addHolder">
                    <img className="image" src={Image1}></img>
                    <ImageContainer></ImageContainer>
                </div>
                <div className="cover"></div>
                
                
            </div>
        </div>
    );
}

export default Home;