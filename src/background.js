

function deleteSelectArea() {
    target = document.querySelector('#lecture_layer').parentElement
    document.body.removeChild(target)
}

function selectVideo() {

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
        new_div.innerHTML += '<div id="lecture_layer"><img id="lecmind_layout" src="https://png.pngtree.com/background/20210714/original/pngtree-dark-blue-solid-color-background-wallpaper-picture-image_1219002.jpg" class="lecture_play_img" /></div>';
        document.body.appendChild(new_div)
        
        var img = document.querySelector('#lecmind_layout')
        img.style.width = element.width + 'px';
        img.style.height = element.height + 'px';
        img.style.opacity = '0.4'

        var select_guide = document.createElement('div')
        select_guide.setAttribute('id', 'guide_textbox')
        select_guide.style.position = 'absolute';
        select_guide.style.textAlign = 'center';
        select_guide.style.backgroundColor = "white"
        select_guide.style.width = "300px"
        select_guide.style.height = "50px"
        select_guide.style.borderRadius = "20px"
        select_guide.style.top = -(new_div.offsetTop / 2)+ 'px'
        select_guide.style.boxShadow = "2px 3px 5px 0px";
        select_guide.innerHTML += '<div id="guide_text"><h2>수강할 영상을 선택해주세요!</h2></div>'
        select_guide.style.marginLeft = "auto";
        select_guide.style.marginRight = "auto";
        new_div.appendChild(select_guide);
        
        var new_btn = document.createElement('div');
        new_btn.setAttribute('class', 'playbtn');
        new_btn.style.position = 'absolute';
        new_btn.style.top = (new_div.offsetHeight / 4) + 'px'
        new_btn.style.left = (new_div.offsetWidth / 3) + 'px'
        new_btn.innerHTML +=  '<button class="lecture_select_btn" ><img src="https://cdn-icons-png.flaticon.com/128/149/149125.png" /></button>';
        document.querySelector('#lecture_layer').appendChild(new_btn); // new_div 안쪽으로 들어감
        document.querySelector('.lecture_select_btn').style.opacity = "1"
        document.querySelector('.lecture_select_btn').style.zIndex = "1000"
        document.querySelector('.lecture_select_btn').style.transition = "all .5s"


        var inputPop = document.createElement('div');
        inputPop.innerHTML += '<div class="background" ><div class="window" ><div class="subject_input_pop" ><form id="form" ><h2>과목을 입력해주세요.</h2><input type="text"/><input onclick="self.close();" type="submit" value="확인" /><input onclick="self.close();" type="reset" value="취소" /></form></div></div></div>'
        new_btn.appendChild(inputPop);
        document.querySelector('.background').style.position = "fixed"
        document.querySelector('.background').style.top = "0"
        document.querySelector('.background').style.left = '0'
        document.querySelector('.background').style.width = "100%"
        document.querySelector('.background').style.height = "100%"
        document.querySelector('.background').style.backgroundColor = "rgba(0, 0, 0, 0.3)"
        document.querySelector('.background').style.zIndex = "-1"
        document.querySelector('.background').style.opacity = "0"
        document.querySelector('.window').style.position = "relative"
        document.querySelector('.window').style.width = "100%"
        document.querySelector('.window').style.height = "100%"
        document.querySelector('.subject_input_pop').style.position = "absolute"
        document.querySelector('.subject_input_pop').style.top = "50px"
        document.querySelector('.subject_input_pop').style.left = "50px"
        document.querySelector('.subject_input_pop').style.backgroundColor = "white"
        document.querySelector('.subject_input_pop').style.boxShadow = "0 2px 7px rgba(0, 0, 0, 0.3)"
        document.querySelector('.subject_input_pop').style.textAlign = "center"
        document.querySelector('.subject_input_pop').style.width = "300px"
        document.querySelector('.subject_input_pop').style.height = "150px"
        document.querySelector('.subject_input_pop').style.transform = "translate(-50%, -40%)"
        document.querySelector('#form').style.opacity = "1"
        document.querySelector('#form').style.zIndex = "1000"

    }
    else {
        var new_div = document.createElement('div'); 
        document.body.appendChild(new_div)
        var select_guide = document.createElement('div')
        select_guide.setAttribute('id', 'guide_textbox')
        select_guide.style.position = 'absolute';
        select_guide.style.textAlign = 'center';
        select_guide.style.backgroundColor = "white"
        select_guide.style.width = "300px"
        select_guide.style.height = "50px"
        select_guide.style.borderRadius = "20px"
        select_guide.style.top = -(new_div.offsetTop / 2)+ 'px'
        select_guide.style.boxShadow = "2px 3px 5px 0px";
        select_guide.innerHTML += '<div id="guide_text"><h1>선택 가능한 영상이 없습니다.</h1></div>'
        new_div.appendChild(select_guide)
    }
    document.querySelector('.lecture_select_btn').addEventListener('click', function(){
        document.querySelector(".background").className = "background lecture_select_btn"; //open
    });

}

function close () {
    document.querySelector(".background").className = "background";
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        id = tabs[0].id
        
        if (message === 'selectVideo') {
            sendResponse({work: 'welcome!'})
            chrome.scripting.executeScript({target: { tabId: id }, func: selectVideo})
            //chrome.scripting.executeScript({target: { tabId: id}, files: [injectedScript.bundle.js]})
        }
    });
});

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function() {
            chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
                id = tabs[0].id
                chrome.scripting.executeScript({target: { tabId: id }, func: deleteSelectArea})
            });
        });
    }
});