import React from "react";
import { render } from "react-dom";
import Memo from "./Memo.js";
import Video from "./Video.js";



//강의 수강 페이지
function LearningPage(){
    return (
        <div className="learning">
            <Video />
            <Memo />
        </div>
    )
}


export default LearningPage;