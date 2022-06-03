import React from 'react';
import {render} from 'react-dom';
import '../popup.css';

function Popup(){
    return (
        <div class="popup">
            <div class="popup_title">Lecmind</div>
            <div class="popup_signin">
                로그인 후<br />이용하실 수 있습니다. 
                <form action="" method="POST">
                    <h1>Sign in</h1>
                    <div class="social-container">
                    </div>
                    
                    <div class="input-box">
                        <div id="id_title">id</div>
                        <input class="signin" type="text" name="id" placeholder="id"></input>
                    </div>

                    <div class="input-box">
                        <div id="password_title">password</div>
                        <input class="signin" type="password" name="password" placeholder="password"></input>
                    </div>
                
                    <input id="submit_signin" type="submit" value="Submit"></input>
                    <a id="google_sigin" href="{% provider_login_url 'google' %}">
                        Sign in with Google    
                    </a>
                </form>
            </div>
        </div>
    )
}

export default Popup;