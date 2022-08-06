
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Uncommon.css"


function UncommonProduct2(){


    function onclick(){
        console.log("hello"+pid)
    }

        const [pid , setPid] = useState(localStorage.getItem("catId"));
       // localStorage.removeItem("catId")
        const {common} = useSelector((state)=>state.common);
       
        const [sizeIndex,setIndex]= useState(0)
        console.log("coml"+common.length)

        console.log("pid"+pid)
        var stringid = pid
    console.log(stringid)
        const products = common.filter(({ category }) => {
            return category !== null;
          });

          console.log(products)

          const productss = products.filter(({ category , producer}) => {
            return category.categoryId.toString() === stringid && producer != null;
          });

          console.log(productss)

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

          const color = "red"

          function click(n){
            setIndex(sizeIndex+n)
            console.log("index "+sizeIndex)
          }
    return(
        <div>
            {common.length===0&&<div>
                <h2 style={{color: "rgb(109, 108, 108)" , fontSize:"2vw"}}>Loading</h2>
                <p style={{color: "rgb(109, 108, 108)" , fontSize:"0.8vw"}}>or no valid products for this product</p>
                </div>}
            {common.length!== 0 && productss.map((product)=>(
            
                <div class='product'>
                <div class='imageHolderProduct'>
                {product.productImages.map((image)=>(
                            <div >
                                <img className="image" id={image.id} src={image.url} />
                            <div className="rightHandler" onClick={(event)=>check(event,image.id)} ></div>
                            </div>
                        ))}
                </div>
               <p class='theme'><b>UNCOMMON.</b></p>
               <p class='productid'><b>U</b> {product.id}</p>
                <h3 class='productName'>{product.category.type}</h3>
                <p class='type'>{product.category.material}</p>
                <p class='size'><b>SIZE :</b> {product.size}</p>
                <p class='metiriar'><b>MATERIAL :</b> {product.material}</p>
                <p class='color'><b>COLOR :</b> {product.color}</p>
                <p class='option'><b>OPTIONS :</b> {product.options}</p>
                <p class='usage'>USE - {product.uses}</p>
                <p class='usage specialUse'><u><b>SPECIAL USE FOR </b>- {product.specialUsage}</u></p>
                <p class='price'><b>Price </b> - {product.price}</p>
                 <p class='warranty'><b>Warranty </b> - {product.warranty}</p>
                <p class='delivery'><b>Delivery And Payment </b> - {product.delivery}</p>
                <div class='colorSymble symble1' style={{background:product.statecodes.repayColor}}></div>
			   	<div class='colorSymble symble2' style={{background:product.statecodes.changeColor}}></div>

			   <div class='colorSymble symble3' style={{background:product.statecodes.warrantyColor}}></div>
			   <div class='colorSymble symble4' style={{background:product.statecodes.discountColor}}></div>
                 <div class='blackSymble'></div>
                <p class='benifit' style={{color:product.statecodes.changeColor}}><b>special benifit for this product</b></p>
                <p class='benifit repay'><b>REPAY</b></p>
                <p class='benifit change'><b>CHANGE</b></p>
                <p class='benifit afterwarrnty'><b>AFTER WARRANTY</b></p>
                <p class='benifit discount'><b>40% OFF</b></p>
                <p class='after'>after 30 days</p>
                <p class='half'>(half value)</p>
                <p class='contact'>FOR MORE INFORMATIONS   <b>+94 765 233 983</b></p>
                <p class='msg'><u>Not Online Buy facility Now</u></p>
                <div class='special'><p>{product.specialData}</p></div>
                <div class='borderBottom borderBottom2'></div>
                <p class='madein'>MadeIn : {product.madeIn}</p>
                <p class='design'>Design by: {product.designBy}</p>
                <p class='quality'>Quality : {product.qualityOf}</p>
                <p class='inventor'>Invent By : {product.producer.name}</p>
                <div class='colorBox box1'><div class='ball'></div></div>
                <div class='colorBox box2'><div class='ball'></div></div>
                <div class='colorBox box3'><div class='ball'></div></div>
                <div class='colorBox box4'><div class='ball'></div></div>
                </div>
            ))
            }
            
        </div>
    )
}

export default UncommonProduct2