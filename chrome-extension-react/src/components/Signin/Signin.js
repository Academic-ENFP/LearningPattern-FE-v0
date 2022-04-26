import React from "react";
import { render } from "react-dom";
import '../../css/signin.css'

function Signin() {
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