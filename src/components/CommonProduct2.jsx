
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function CommonProduct2(){
    

    const [pid , setPid] = useState(localStorage.getItem("catId"));
        localStorage.removeItem("catId")
        const {common} = useSelector((state)=>state.common);
        
        const [sizeIndex,setIndex]= useState(0)
        console.log(common.length)

        console.log(pid)
        var stringid = pid
    
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
            {common.length===0&&<div>
                <h2 style={{color: "rgb(109, 108, 108)" , fontSize:"2vw"}}>Loading</h2>
                <p style={{color: "rgb(109, 108, 108)" , fontSize:"0.8vw"}}>or no valid products for this product</p>
                </div>}
            {common.length!== 0 && productss.map((product)=>(
                
                <div class='product'>
                <div>
                    <div className="imageHolderProduct">
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
                
                </div> 
                
            ))
            }
        </div>
    )
}

export default CommonProduct2