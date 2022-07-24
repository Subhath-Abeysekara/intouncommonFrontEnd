import React, { useEffect, useState } from "react";
import "./UncommonProject.css"
import Image1 from './Images/web instruction for INVENTORS WEB1.png';
import Image2 from './Images/web instruction for INVENTORS WEB2.png';
import Image3 from './Images/web instruction for INVENTORS WEB3.png';
import Image4 from './Images/web instruction for INVENTORS WEB4.png';
import Image5 from './Images/web instruction for INVENTORS WEB5.png';
import Image6 from './Images/designer instrction WEB1.png';
import Image7 from './Images/designer instrction WEB2.png';
import Image8 from './Images/designer instrction WEB3.png';
import Image9 from './Images/image01.png';


function UncommonProject(){

    const [inventer , setInventer] = useState(false)
    const [designer , setDesigner] = useState(false)


    function inventerClick(){
        setInventer(true)
        setDesigner(false)
    }

    function designerClick(){
        setInventer(false)
        setDesigner(true)
    }

    useEffect(()=>{
        if(localStorage.getItem("project")==="1"){
            setInventer(true)
            setDesigner(false)
        }
        else{
            if(localStorage.getItem("project")==="2"){
                setInventer(false)
                setDesigner(true)
            }
        }
    },[])
    return(
        <div class="frame">
            {inventer? <div className="project1">
            <div className="imageHolder imageHolder1" >
                 <img class='image' src={Image1}/>
                </div>
                <div className="imageHolder imageHolder2" >
                 <img class='image' src={Image2}/>
                </div>
                <div className="imageHolder imageHolder3" >
                 <img class='image' src={Image3}/>
                </div>
                <div className="imageHolder imageHolder4" >
                 <img class='image' src={Image4}/>
                </div>
                <div className="imageHolder imageHolder5" >
                 <img class='image' src={Image5}/>
                </div>
</div>:<div>
    {designer?<div className="project2">
    <div className="imageHolder imageHolder1" >
                 <img class='image' src={Image6}/>
                </div>
                <div className="imageHolder imageHolder2" >
                 <img class='image' src={Image7}/>
                </div>
                <div className="imageHolder imageHolder3" >
                 <img class='image' src={Image8}/>
                </div>
</div>:<div className="projectHolder">
    <span style={{color: "rgb(109, 108, 108)" , fontSize:"1vw"}}>Clicke Hear... </span>
    <button onClick={inventerClick}>Inventer</button><span style={{color: "rgb(109, 108, 108)" , fontSize:"1vw"}}> OR </span>
    <button onClick={designerClick}>Designer</button>
    <div className="projectImageHolder" >
                 <img class='image' src={Image9}/>
                </div>
    </div>}
    </div>}
          
           
        </div>
    );
}

export default UncommonProject;