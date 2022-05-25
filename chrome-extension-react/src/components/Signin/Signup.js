import React from "react";
import { render } from "react-dom";

function Signup() {
    return (
        <div className="container">
            <div className="signup">
                <div className="title">Sign up</div>
                <div className="input-box">
                    <div id="email_title">email address</div>
                    <input id="email" placeholder="email address"></input>
                </div>
                <div className="input-box">
                    <div id="password_title">password</div>
                    <input id="password" placeholder="password"></input>
                </div>
                <div className="input-box">
                    <div id="password_confirm_title">confirm password</div>
                    <input id="password_confirm" placeholder="password confirm"></input>
                </div>
                <button className="create">create account</button>
            </div>
        </div>
    )
}

export default Signup;