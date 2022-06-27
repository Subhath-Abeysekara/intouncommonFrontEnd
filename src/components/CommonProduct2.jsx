
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Image1 from './Images/add.jpg';
import Image2 from './Images/add2.png';
import Image3 from './Images/add3.png';
import Image4 from './Images/add4.png';
import Image5 from './Images/add5.png';
import Image6 from './Images/add6.png';

function CommonProduct2(){
        const {pid} = useParams();
        const {common} = useSelector((state)=>state.common);
        const images = [Image1,Image1,Image2,Image3,Image4,Image5,Image6,Image6]
        const [sizeIndex,setIndex]= useState(0)
        console.log(common.length)

        console.log(pid)
        var stringid = ""
    for(var i=0;i<pid.length-1;i++){
        if(pid[i]==':'){
            for(var i=0;i<pid.length-1;i++){
            
                    stringid+=pid[i+1];
            }
            break
        }
    }
    console.log(stringid)
        const products = common.filter(({ category }) => {
            return category !== null;
          });

          console.log(products)

          const productss = products.filter(({ category , producer}) => {
            return category.categoryId.toString() === stringid && producer != null;
          });

          console.log("products"+productss)

          function check(event,data){
            console.log(data)
            let component = document.getElementById(data)
            if(sizeIndex===0){
                component.style.opacity=1
                setIndex(sizeIndex+1)
            }
            else{
                component.style.opacity=0
                setIndex(sizeIndex-1)
            }
            
          }

          function click(){
            setIndex(sizeIndex+1)
            if(sizeIndex==5){
                setIndex(0)
            }
            console.log("index "+sizeIndex)
           // console.log("n"+n)
          }

          function click2(){
            setIndex(sizeIndex-1)
            if(sizeIndex==-1){
                setIndex(4)
            }
            console.log("index "+sizeIndex)
            //console.log("n"+n)
          }
    return(
        <div>
            {common.length!== 0 && productss.map((product)=>(
                
                <div class='product'>
                <div>
                    <div className="imageHolder">
                        {product.productImages.map((image)=>(
                            <div >
                                <img className="image" id={image.id} src={image.url} />
                            <div className="rightHandler" onClick={(event)=>check(event,image.id)} ></div>
                            </div>
                        ))}
                    </div>
                </div>
                <p class='theme'><b>{product.brand}</b></p>
                <p class='productid'><b>C {product.id}</b></p>
                <h3 class='productName'>{product.category.type}</h3>
                <p class='type'>{product.category.material}</p>
                <p class='size'><b>SIZE - </b>{product.size}</p>
                <p class='metiriar'><b>MATERIAL - </b>{product.material}</p>
                <p class='color'><b>COLOR</b> - {product.color}</p>
                <p class='option'><b>OPTIONS</b> - {product.options}</p>
                <p class='usage'>USE - {product.uses}</p>
                <p class='price'><b>Price</b> - {product.price}</p>
                 <p class='warranty'><b>Warranty</b> - {product.warranty}</p>
                <p class='delivery'><b>Delivery And Payment</b> - {product.delivery}</p>
                <div class='redSymble'></div>
                <div class='blackSymble'></div>
                <p class='productor'><b>PRODUCTOR DETAILS</b></p>
                <p class='productor name'><b>Name </b>: {product.producer.name}</p>
                <p class='productor address'><b>Address </b>: {product.producer.address}</p>
                <p class='contact'>FOR MORE INFORMATIONS   <b>+94 765 233 983</b></p>
                <p class='msg'><u>Not Online Buy facility Now</u></p>
                <div class='special'><p>product for date 7</p></div>
                <div class='borderBottom borderBottom2'></div>
                </div>
                
            ))
            }
        </div>
    )
}

export default CommonProduct2