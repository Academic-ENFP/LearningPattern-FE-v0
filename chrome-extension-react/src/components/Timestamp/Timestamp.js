import React from "react";
import { render } from "react-dom";
import Memo from "../LearningPage/Memo.js";
import Video from "../LearningPage/Video.js";
import '../../css/timestamp.css'


//타임스탬프 상세 페이지
function Timestamp() {
    //메모데이터 POST
    fetch("URL", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(res => {
        return res.json()
    })

    //집중도가 낮은 GET

    return (
        <div className="timestamp">
            <div className="timestamp_title">타임스탬프</div>
            <Video />
            <Memo />
        </div>
    )
}

export default Timestamp;