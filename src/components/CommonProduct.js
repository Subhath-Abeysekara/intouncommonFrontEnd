import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {ref , listAll, getDownloadURL} from "firebase/storage"
import {storage} from "./Firebase"
import  Home from "./Home"
import ImageContainer from "./ImageContainer";
import Image1 from './Images/add.jpg';
import Image2 from './Images/add2.png';
import Image3 from './Images/add3.png';
import Image4 from './Images/add4.png';
import Image5 from './Images/add5.png';
import Image6 from './Images/add6.png';
import "./Common.css"

function CommonProducts(){

    const[imageList,setImageList] = useState([])
    const[imageLists,setImageLists] = useState([])
    const[slideNumber,setSlide] = useState(2)
    const[resultCopy,setResult] = useState(localStorage.getItem("result"))
    const { pid }= useParams();
    const images = [Image1,Image1,Image2,Image3,Image4,Image5,Image6,Image6]
    const imagesM = [images]

    function click(){
        setSlide(slideNumber+1)
        console.log(slideNumber)
        var element = document.getElementById("id2")
        element.innerHTML = "<img class='image' src='"+images[slideNumber]+"'/>"
    }
    
    useEffect(()=>{
        var stringid = ""
    for(var i=0;i<pid.length-1;i++){
        if(pid[i]==':'){
            for(var i=0;i<pid.length-1;i++){
            
                    stringid+=pid[i+1];
            }
            break
        }
    }
        fetch("http://localhost:8080/intouncommon/getproductsandcontact?id="+2,{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
          console.log(result)
          var string = ""
          var variables=["","","","","","",""]
          var skipAmount=[6,10,7,9,7,10,10]
          var position=0;
          var primary = []
          var contact=result.contact;
          var topl=0
          for(var j=0; j<result.productions.length; j++){
              if(result.productions[j].category == null){
                  
              }
              else{
                  if(result.productions[j].category.categoryId == stringid){
                      if(result.productions[j].primaryData!=null){
                        primary = result.productions[j].primaryData
                       // alert(primary[0])
                        for(var a=0; a<primary.length; a++){
                            if(primary[a]=="*"){
                                var b=a+skipAmount[position]
                                
                                while(primary[b]!=","){
                                    variables[position]+= primary[b]
                                    b+=1
                                    
                                }
                                position+=1
                            }
                        }
                      }
                      console.log(result.productions[j])
                      primary=""
                      var address=""
                      if(result.productions[j].producer!=null){
                          if(result.productions[j].producer.basicDetails!=null){
                            primary = result.productions[j].producer.basicDetails
                            for(var a=0; a<primary.length; a++){
                                if(primary[a]=="*"){
                                    var b=a+8
                                    
                                    while(primary[b]!=","){
                                        address+= primary[b]
                                        b+=1
                                        
                                    }
                                }
                            }
                          }

                              listAll(ref(storage,"product"+result.productions[j].id+"/")).then((response)=>{
                                response.items.forEach((item)=>{
                                    getDownloadURL(item).then((url)=>{
                                        setImageList((prev)=>[...prev,url])
                                        localStorage.setItem("imageCount",imageList.length)
                                        alert(localStorage.getItem("imageCount"))
                                    })
                                })
                            })
                            string+= "<div class='product' style='top:"+topl+"px;'><div class='imageHolder' id='id"+result.productions[j].id+"'>"
                            console.log("contact"+contact)
                            /*if(images!=null){
                                for(var a=0; a<images.length; a++){
                                    string+="<img class='image' src='"+images[a]+"'/>"
                                }
                            }*/
                            string+="<img class='image' src='"+imagesM[images[0]]+"'/>"
                          // string+=<ImageContainer></ImageContainer>
                            string+="<div class='leftHandler' id='id1' onclick='var i=2; localStorage.setItem('i',i); console.log(localStorage.getItem('i'))'></div><div class='rightHandler'></div></div>"+
                            "<p class='theme'><b>Productor's brand name</b></p><h3 class='productName'>"+result.productions[j].category.type+"</h3><p class='type'>Common</p>"+
                            "<p class='size'><b>SIZE</b>- "+variables[0]+"</p>"+
                            "<p class='metiriar'><b>MATERIAL</b>-"+variables[1]+"</p>"+
                            "<p class='color'><b>COLOR</b>- "+variables[2]+"</p>"+
                            "<p class='option'><b>OPTIONS</b>- "+variables[3]+"</p>"+
                            "<p class='usage'>USE -"+result.productions[j].uses+"</p>"+
                            "<p class='price'><b>Price</b> - "+variables[4]+"</p>"+
                            "<p class='warranty'><b>Warranty</b> - "+variables[5]+"</p>"+
                            "<p class='delivery'><b>Delivery And Payment</b> - "+variables[6]+"</p>"+
                            "<div class='redSymble'></div>"+
                            "<div class='blackSymble'></div>"+
                            "<p class='productor'><b>PRODUCTOR DETAILS</b></p>"+
                            "<p class='productor name'><b>Name </b>: "+result.productions[j].producer.name+"</p>"+
                            "<p class='productor address'><b>Address </b>: "+address+"</p>"+
                            "<p class='contact'>FOR MORE INFORMATIONS   <b>"+contact+"</b></p>"+
                            "<p class='msg'><u>Not Online Buy facility Now</u></p>"+
                            "<div class='specials'><p>Special information<br></br>"+result.productions[j].specialData+"</p></div>"+
                            "</div>"
    
                            topl+=750
                           
                         
                      }
                  }
              }
          }
          var frame = document.getElementById("body")
        frame.innerHTML = string
      })
        
        
    },[])
    return(
        <div className="main">
            <div className="head">
                <h4 className="header">UNCOMMON.</h4>
                <p className="header2">Uncommon products - <b>Design and Informations</b></p>
                <button onClick={click}>Move</button>
                <div className="borderBottom"></div>
                <div className="body" id="body">
                
                </div>
            </div>
        </div>
    );
}

export default CommonProducts;