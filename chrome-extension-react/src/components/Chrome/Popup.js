import React from "react";
import { render } from "react-dom";
import '../../css/popup.css';

function opennewTab() {
    chrome.tabs.create({
        url: 'home.html'
    });
}

function selectVideo() {
    videos = document.getElementsByTagName('video')
    if (videos.length() != 0) {
        for (v = 0; v < videos.length(); v++){
            var element = videos[v].getBoundingClientRect();
            var top = element.top;
            var left = element.left;
            var width = element.width;
            var height = element.height;
            var new_div = document.createElement("div");
            new_div.innerHTML = '<div id="lecture_layer"><img src="" class="lecture_play_img" /></div>';

            new_div.style.top = top;
            new_div.style.left = left;
            new_div.style.width = width;
            new_div.style.height = height;
            new_div.style.zIndex = 2147483646;
            new_div.style.position = absolute;
            new_div.style.display = flex;
            new_div.style.justifyContent = center;
            new_div.style.alignItems = center;
            new_div.style.overflow = hidden;
            
            // z-index, 투명도 지정하기, 위치조정
            // var new_btn = document.createElement('button');
            // new_btn.innerHTML = '<bytton id="lecture_select_btn">선택</button>';
        }
    }
    // $(function(){
    //     $("lecture_play_img").click(function(){
    //     // 강의 팝업으로 이동
    //     });
    // });
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