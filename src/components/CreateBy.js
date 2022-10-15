import React from "react";
import ImageDis from './Images/ALL FOR WEB (1).png';
import ImageIcode from './Images/icode3.png';
import './Create.css';

function CreateBy(){

    function create(){
        window.location="/"
      }

    return(
        <div className="mainCreate">
            <div className="discription">
                 <img src={ImageDis} className="imageDis"></img>
            </div>
            <div className="footer"><p className="createrTopic">#ALLForweb</p></div>
          <div className="creater" onMouseLeave={create}><img className="icode" src={ImageIcode}></img></div>
        </div>

    )
}

export default CreateBy;