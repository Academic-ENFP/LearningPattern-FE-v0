import React from "react";
import { render } from "react-dom";
import '../../css/popup.css';

//내 문서함(home) function
function opennewTab() {
    chrome.tabs.create({
        url: 'home.html'
    });
}


function selectVideo() {
    document.querySelector("#learning_popup_open").addEventListener('click', open);

    videos = document.getElementsByTagName('video')
    if (videos.length != 0) {
        var element = videos[0].getBoundingClientRect();
        var top = element.top;
        var left = element.left;
        var width = element.width;
        var height = element.height;
        var new_div = document.createElement('div'); 

        new_div.style.top = element.top + 'px'; // 인식이 잘 안됨
        new_div.style.left = left + 'px';
        new_div.style.width = width + 'px';
        new_div.style.height = height + 'px';
        new_div.style.zIndex = 2147483646;
        new_div.style.position = 'absolute';
        new_div.style.display = 'flex';
        new_div.style.justifyContent = 'center';
        new_div.style.alignItems = 'center';
        //투명도

        new_div.innerHTML += '<div id="lecture_layer"><img id="lecmind_layout" src="https://png.pngtree.com/background/20210714/original/pngtree-dark-blue-solid-color-background-wallpaper-picture-image_1219002.jpg" class="lecture_play_img" /></div>';
        var body = document.querySelector('body');
        body.appendChild(new_div)
        

        var img = document.querySelector('#lecmind_layout')
        img.style.width = element.width + 'px';
        img.style.height = element.height + 'px';
        img.style.opacity = '0.4'


        var new_btn = document.createElement('div');
        new_btn.innerHTML += '<a href="#" class="lecture_select_btn" ><img src="https://cdn-icons-png.flaticon.com/128/149/149125.png" /></a>';
        document.querySelector('#lecture_layer').appendChild(new_btn); // new_div 안쪽으로 들어감
        new_btn.style.position = 'absolute';
        new_btn.style.top = new_div.offsetTop + 'px'
        new_btn.style.left = new_btn.offsetWidth  + 'px'
        
        //레이어팝업
        var inputPop = document.createElement('div');
        inputPop.innerHTML += '<div class="background"><div class="window"><div class="subject_input_pop><form id="form"><h2>과목을 입력해주세요.</h2><input type="text"/><input onclick="self.close();" type="submit" value="확인" /><input onclick="self.close();" type="reset" value="취소" /></form></div></div></div>'
        new_div.appendChild(inputPop)
    }

}

function open () {
    document.querySelector(".background").className = "background lecture_select_btn";
}
  
function close () { 
    document.querySelector(".background").className = "background";
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
            <button id="newTab">New tab</button>
            <button id="select">video select</button>
        </div>
    )

}


export default Popup;