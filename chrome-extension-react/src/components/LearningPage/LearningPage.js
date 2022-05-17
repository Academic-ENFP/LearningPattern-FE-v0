import React from "react";
import { render } from "react-dom";
import "./LearningPage.css"

function LearningPage(){
    return (
        <div className="learning">
            <Video />
            <Memo />
        </div>
    )
}


export default LearningPage;