import React from "react";
import { render } from "react-dom";
import Memo from "../LearningPage/Memo.js";
import Video from "../LearningPage/Video.js";
import '../../css/timestamp.css'

function Timestamp() {
    return (
        <div className="timestamp">
            <div className="timestamp_title">타임스탬프</div>
            <Video />
            <Memo />
        </div>
    )
}

export default Timestamp;