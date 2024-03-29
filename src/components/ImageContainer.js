import React, { useEffect, useState } from "react";
import Image1 from './Images/image01.png';
import Image2 from './Images/image02.png';
import Image3 from './Images/image03.png';
import Image4 from './Images/image04.png';
import Image5 from './Images/image05.png';
import Image6 from './Images/image06.png';
import Image7 from './Images/image07.png';
import Image8 from './Images/image08.png';
import Image9 from './Images/image09.png';
import Image10 from './Images/image10.png';

import './Home.css';

function ImageContainer(){
    const [mseconds,setmSeconds] = useState(0)
    const [seconds,setSeconds] = useState(0)
    const images = [Image1,Image1,Image2,Image3,Image4,Image5,Image6,Image7,Image8,Image9,Image10,Image10]
    
    

   if(localStorage.getItem("i")==images.length){
       localStorage.removeItem("i")
   }
    if(localStorage.getItem("i")==null){
        localStorage.setItem("i",2)
    }
    if(localStorage.getItem("side")==null){
        localStorage.setItem("side","plus")
    }
  //  x.src = images[0]
    var timer
    useEffect(()=>{

        if(Image2==null||Image1==null){
            console.log(images[1])
        }
        else{
           // console.log(images[1])
            timer = setInterval(()=>{
                

                var index = localStorage.getItem("i")
            var i = parseInt(index)
            var x = document.getElementsByClassName("adHolder")
       // console.log("i= "+localStorage.getItem("i"))
       // console.log("side= "+localStorage.getItem("side"))
        //console.log(x[0])
        //x[1].style.opacity=1
        
        if(localStorage.getItem("side")=="plus"){
            
            x[i].classList.add("moveLeftCurrentSlide")
            i=i+1
            if(i==images.length){
               // console.log(images.length)
                i=i-2
                localStorage.setItem("side","minus")
                for(var j=0; j<x.length; j++){
                    x[j].className="adHolder";
                    x[j].style.opacity=1;
                }
                x[11].style.opacity=0;
            }
        }
        else{
            if(localStorage.getItem("side")=="minus"){
                x[i].classList.add("moveRightCurrentSlide")
            i=i-1
            if(i==0){
                i=i+2;
                localStorage.setItem("side","plus")
                for(var j=0; j<x.length; j++){
                    x[j].className="adHolder";
                    x[j].style.opacity=0;
                }
            }
            }
        }
            
            
            localStorage.setItem("i",i)
            },4000)
            return()=>clearTimeout(timer)
        }
    },[])

    return(
        <div>
            <div className="adHolder" id="add">
                 <img class='image' src={images[0]}/>
                </div>
            <div className="adHolder" id="add">
                 <img class='image' src={images[1]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[2]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[3]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[4]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[5]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[6]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[7]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[8]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[9]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[10]}/>
                </div>
                <div className="adHolder" id="add">
                 <img class='image' src={images[11]}/>
                </div>
        </div>
    )
}

export default ImageContainer