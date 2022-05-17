import React from "react";
import { render } from "react-dom";
import '../../css/video.css';


function Video() {
    var playBtn = document.querySelector(".play");
    var stopBtn = document.querySelector(".stop");
    var backBtn = document.querySelector(".back");
    var frontBtn = document.querySelector(".front");

    //강의 재생, 강의페이지 GET
    fetch("URL")
    .then(res => res.json());

    //강의 시작 POST
    playBtn.addEventListener("click", function() {
        fetch("URL", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
    })

    //강의 일시정지 POST
    stopBtn.addEventListener("click", function() {
        fetch("URL", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
    })

    //강의 되돌리기 POST
    backBtn.addEventListener("click", function(){
        fetch("URL", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
    })

    //강의 넘기기 POST
    frontBtn.addEventListener("click", function(){
        fetch("URL", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
    })

    //강의 종료 집중도, 집중도가 낮은 GET


    return (
        <div className="container">
            <div className="Video">
                <h1>Video</h1>
            </div>
        </div>
    )
}


export default Video;