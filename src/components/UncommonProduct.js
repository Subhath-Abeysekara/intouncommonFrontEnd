import React, { useEffect } from "react"
import { useParams } from "react-router-dom";
import "./Uncommon.css"

function UncommonProduct(){
    const { pid }= useParams();
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

    fetch("http://localhost:8080/intouncommon/getproducts",{
        headers:{"header":localStorage.getItem("user")}
      })
      .then(res=>res.json())
      .then((result)=>{
          console.log(result)
          var string = ""
          var topl=0
          for(var j=0; j<result.length; j++){
              if(result[j].category == null){
                  
              }
              else{
                  if(result[j].category.categoryId == stringid){

                      console.log(result[j])
                      if(result[j].producer!=null){
                        string+= "<div class='product' style='top:"+topl+"px;'>"+
                        "<div class='imageHolder'>"+
                            "<div class='leftHandler'></div>"+
                            "<div class='rightHandler'></div>"+
                        "</div>"+
                       "<p class='theme'><b>UNCOMMON.</b></p>"+
                        "<h3 class='productName'>PENCIL HOLDER</h3>"+
                        "<p class='type'>WOOD</p>"+
                        "<p class='size'><b>SIZE</b>- standed height 12.5/diameter 8.25/weight 250kg</p>"+
                        "<p class='metiriar'><b>MATERIAL</b>-Real Teak Wood</p>"+
                        "<p class='color'><b>COLOR</b>-Natural Teak And Black</p>"+
                        "<p class='option'><b>OPTIONS</b>-till 15.5 height adjustable , change bulb and holder like that</p>"+
                        "<p class='usage'>USE - Home And Hotel / Gift And Present/Suvinear/Brand Name Promotion</p>"+
                        "<p class='usage specialUse'><u><b>SPECIAL USE FOR</b>- BRAND NAME PROMOTION</u></p>"+
                        "<p class='price'><b>Price</b> - 4600LKR</p>"+
                        "<p class='warranty'><b>Warranty</b> - 21months</p>"+
                        "<p class='delivery'><b>Delivery And Payment</b> - On money with curia</p>"+
                        "<div class='colorSymble symble1' style='background : green;'></div>"+
                        "<div class='colorSymble symble2'></div>"+
                        "<div class='colorSymble symble3' style='background : green;'></div>"+
                        "<div class='colorSymble symble4'></div>"+
                        "<div class='blackSymble'></div>"+
                        "<p class='benifit'><b>special benifit for this product</b></p>"+
                        "<p class='benifit repay'><b>REPAY</b></p>"+
                        "<p class='benifit change'><b>CHANGE</b></p>"+
                        "<p class='benifit afterwarrnty'><b>AFTER WARRANTY</b></p>"+
                        "<p class='warantyfiread'><b>warranty firead</b></p>"+
                        "<p class='benifit discount'><b>40% OFF</b></p>"+
                        "<p class='after'>after 30 days</p>"+
                        "<p class='half'>(half value)</p>"+
                        "<p class='contact'>FOR MORE INFORMATIONS   <b>+94 765 233 983</b></p>"+
                        "<p class='msg'><u>Not Online Buy facility Now</u></p>"+
                        "<div class='special'><p>product for date 7</p></div>"+
                        "<div class='borderBottom borderBottom2'></div>"+
                        "<p class='madein'>Made In SRI LANKA</p>"+
                        "<p class='design'>Design by: Prabhath Abeysekara</p>"+
                        "<p class='quality'>Australian expory quality</p>"+
                        "<p class='inventor'>Invent By : R.D Seeladasa</p>"+
                        "<div class='colorBox box1'><div class='ball'></div></div>"+
                        "<div class='colorBox box2'><div class='ball'></div></div>"+
                        "<div class='colorBox box3'><div class='ball'></div></div>"+
                        "<div class='colorBox box4'><div class='ball'></div></div>"+
                        "</div>"

                        topl+=750
                      }
                  }
              }
          }
          var frame = document.getElementById("body")
        frame.innerHTML = string
      })
    
    })

    return(
        <div className="main">
        <div className="head">
            <h4 className="header">UNCOMMON.</h4>
            <p className="header2">Uncommon products - <b>Design and Informations</b></p>
            <div className="borderBottom"></div>
            <div className="body" id="body">
                
            </div>
        </div>
    </div>
    );
}

export default UncommonProduct;