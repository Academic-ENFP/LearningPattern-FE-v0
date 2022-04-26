import React from "react";
import { render } from "react-dom";
import '../../css/popup.css';

function opennewTab() {
    chrome.tabs.create({
        url: 'learningpage.html'
    });
}

function selectVideo() {

}

function Popup() { //popup을 호출할 react component 정의
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('newTab').addEventListener('click', opennewTab);
    });

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('select').addEventListener('click', selectVideo);
    });

    return (
        <div className="popup">
            <button id="newTab">new tab</button>
            <button id="select">video select</button>
        </div>
    )

}




export default Popup;