import React from "react";
import { render } from "react-dom";


function Webcam() {
    
    //웹캠 화면 POST
    fetch("URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => {
        return res.json()
    })
}

export default Webcam;