import React from 'react';
import {render} from 'react-dom';
import '../popup.css';
import Cookies from 'js-cookie'
import axios from "axios"

Cookies.set('csrftoken')
const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)

const login = () => {
    var id = document.querySelector('#id').value
    var pw = document.querySelector('#password').value
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
            <div class="popup_signin">
                로그인 후<br />이용하실 수 있습니다. 
                <div class="input-box">
                    <div id="id_title">id</div>
                    <input id="id" class="signin" type="text" name="id" placeholder="id"></input>
                </div>

                <div class="input-box">
                    <div id="password_title">password</div>
                    <input id="password"class="signin" type="password" name="password" placeholder="password"></input>
                </div>
            
                <button id="submit_signin" value="Login" onClick={login}>Login</button>
                <a id="google_sigin" href="{% provider_login_url 'google' %}">
                    Sign in with Google    
                </a>
            </div>
        </div>
    )
}

export default Popup;