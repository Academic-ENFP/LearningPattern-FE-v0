import React from "react";
import { render } from "react-dom";
import { Router, Link, Route, Switch } from "react-router-dom"
import Signin from "../Signin/Signin";
import '../../css/home.css'

function Home() {
    return (
        <div className="home">
            <div className="nav">
                <div className="nav_title">lecmind</div>
                    <div className="link">                    
                        <a href="signin.html" id="signout_link">Signout</a>
                        <a href="home.html" id="home_link">Home</a>
                    </div>
            </div>
            <div className="mydocument">
                <p className="main_title">내 문서함</p>
                    <div className="memo">
                        <div className="memo_title">메모</div>
                        <div id="button">
                            <button id="newMemo" onClick="location.href='memo.html'">새 메모 작성하기</button>
                            <button id="memo1">1. 다항식의 연산</button>
                            <button id="memo2"></button>
                        </div>
                    </div>
                <div className="lecture">
                    <div className="lecture_title">강의</div>
                    <a href="timestamp.html" id="lecture1">고등 예비과정 수학1</a>
                </div>
            </div>
        </div>
    )
}

export default Home;