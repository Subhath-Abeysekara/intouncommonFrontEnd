import { useState } from "react";
import { useParams } from "react-router-dom";

function Test(){

    const {pid} = useParams();

    function onclick(){
        console.log("hello"+pid)
    }

    return(
        <div>
            <div><h2>hello</h2><button onClick={onclick}>click</button></div>
        </div>
    )

}

export default Test