import React from 'react';
import {render} from 'react-dom';
import '../popup.css';
import Cookies from 'js-cookie'
import axios from "axios"

Cookies.set('csrftoken')
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

const login = () => {
    var id = document.querySelector('#id').value
    var pw = document.querySelector('#pass').value
    axios.post(`http://127.0.0.1:8000/api-token-auth/`,
        {
            password: pw,
            id: id
        },
        {
            "Content-Type": "application/json",
            'X-CSRFToken': Cookies.set('csrftoken'),
        }).then(onLoginSuccess)
}

const onSilentRefresh = () => {
    axios.post(`http://127.0.0.1:8000/api-token-refresh/`, 
        {
            token: Cookies.get('refreshToken')
        },
        {
            "Content-Type": "application/json",
            'X-CSRFToken': Cookies.set('csrftoken'),
        }).then(onLoginSuccess)
}

const onLoginSuccess = response => {
    const accessToken = response.data.token;
    Cookies.set('refreshToken', accessToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    location.reload();
}

function Popup(){
    return (
        <div class="popup">
            <div class="popup_title">Lecmind</div>
            <div class="signin">
                <div class="input-box">
                    <label>Enter id</label><br />
                    <input type="text" id="id" name="id" placeholder="id"></input><br />
                    <label>Enter password</label><br />
                    <input type="password" id="pass" name="password" placeholder="password"></input><br />
                    <button id="signin_btn" value="Login" onClick={login}>Sign In</button>
                </div>
                <div class="signup">
                    아직 Lecmind 회원이 아니신가요? 
                    <button id="signup_btn" onClick={(e)=>{chrome.tabs.create({url: 'http://127.0.0.1:8000/signin'});}}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;