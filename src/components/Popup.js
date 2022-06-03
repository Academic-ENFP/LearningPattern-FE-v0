import React from 'react';
import {render} from 'react-dom';
import '../popup.css';



function Popup(){
    return (
        <div class="popup">
            <div class="popup_title">Lecmind</div>
            <div class="signin">
                <form>
                    <label>Enter email address</label><br />
                    <input type="text" id="email" name="emailaddress" placeholder="email address"></input><br />
                    <label>Enter password</label><br />
                    <input type="password" id="pass" name="password" placeholder="password"></input><br />
                    <input type="submit" id="signin_btn" value="Sign In"></input>
                </form>
            <div class="signup">
                아직 Lecmind 회원이 아니신가요? 
                <button id="signup_btn" onClick={(e)=>{chrome.tabs.create({url: 'http://127.0.0.1:8000/signin'});}}>회원가입</button>
            </div>
            </div>
        </div>
    )
}

export default Popup;