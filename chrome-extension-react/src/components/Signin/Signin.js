import React from "react";
import { render } from "react-dom";
import '../../css/signin.css'

//로그인&로그아웃 페이지
async function Signin() {
    //로그인 post
    var submitBtn = document.querySelector(".submit");

    submitBtn.addEventListener("click", function(){

    let data= new FormData();
    data.append("userId", this.state.userId);
    data.append("password", this.state.password);
    //1
    let res = await fetch("ip:port/clients/signin",{
        method:"POST",
        body: data, // 또는 JSON.stringify({ userId: this.state.userid, password: this.state.password })
        credentials:'include'
    });
    
    if(res.status == 200){ 
        this.props.navigation.navigate("Home_Default"); //로그인 성공 시 홈화면 이동
    
    //스토어저장
    } else {
        alert("아이디와 패스워드를 다시 확인하세요.");
    }
    }) //2

    return (
        
        <div className="container">
            <div className="signin">
                <div className="title">Sign in</div>
                <div className="input-box">
                    <div id="email_title">email address</div>
                    <input id="email" placeholder="email address"></input>
                </div>
                <div className="input-box">
                    <div id="password_title">password</div>
                    <input id="password" placeholder="password"></input>
                </div>
                <button className="submit">Submit</button>
                <button className="signin-with-google">Sign in with Google</button>
                <a href="#">forgotten your password?</a>
            </div>
        </div>
    )
}

export default Signin;