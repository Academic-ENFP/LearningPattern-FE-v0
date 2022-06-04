function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const btnstyle = {
    opacity: 1,
    zIndex: 1000,
    transition: 'all .5s',
}

const bgstyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
}

const winstyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
}

const formstyle = {
    backgroundColor: 'white',
    opacity: 1,
    zIndex: 1000,
}

const popstyle = {
    position: 'absolute',
    top: '50px',
    left: '50px',
    backgroundColor: 'white',
    boxShadow: '0 2px 7px rgba(0, 0, 0, 0.3)',

    /* 임시 지정 */
    width: '100px',
    height: '100px',

    /* 초기에 약간 아래에 배치 */
    transform: 'translate(-50%, -40%)'
}

function setLecture(token, video_id) {
    const csrftoken = getCookie('csrftoken')
    fetch(`http://127.0.0.1:8000/api/lecture/`, {
        method: 'POST',
        body: JSON.stringify({
            video_id: video_id,
            name: "temp",
            degree: null,
            complet_date: null,
            lecture_time: null,
            learning_time: null,
            state: "ongoing",
            subject: "temp"
        }),
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken,
            'Authorization': `Bearer ${token}`
        }
    }).then(res => {
        if(res.ok) {
          alert("생성이 완료되었습니다.")
        }
    }).catch({

    })
    learning(video_id)
}

function learning(video_id){
    var iframe = document.createElement('iframe')
    iframe.setAttribute('src', `http://127.0.0.1:8000/learning/${video_id}`);
    iframe.style.setProperty("position", "absolute", "important");
    iframe.style.setProperty("top", "50%", "important");
    iframe.style.setProperty("left", "50%", "important");
    iframe.style.setProperty("transform", "translate(-50%, -50%)", "important");
    iframe.style.setProperty("width", "100%", "important");
    iframe.style.setProperty("height", "100%", "important");
    iframe.style.setProperty("backgroundColor", "rgb(0, 0, 0)", "important");
    iframe.style.setProperty("boxShadow", "rgba(0, 0, 0, 0.176) 0px 1rem 3rem", "important");
    iframe.style.setProperty("display", "flex", "important");
    iframe.style.setProperty("borderWidth", "0px", "important");
    iframe.style.setProperty("overflow", "hidden", "important");

    var open_btn = document.createElement('button');
    open_btn.setAttribute('id', 'learning_popup_open');
    open_btn.innerHTML = "팝업열기";

    var close_btn = document.createElement('button')
    close_btn.setAttribute('id', 'learning_popup_open');
    close_btn.innerHTML = "팝업닫기"
    
    var lecmind_container = document.querySelector('#lecmind_container')
    while (lecmind_container.hasChildNodes()) {
        lecmind_container.removeChild(lecmind_container.firstChild);
    }
    lecmind_container.appendChild(iframe)
    lecmind_container.appendChild(open_btn)
    lecmind_container.appendChild(close_btn)
    
}

function open () {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        id = tabs[0].id
        chrome.scripting.executeScript({target: { tabId: id }, func: deleteSelectArea})
    });
}

function close () {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        id = tabs[0].id
        chrome.scripting.executeScript({target: { tabId: id }, func: deleteSelectArea})
    });
}


function deleteSelectArea() {
    target = document.querySelector('#lecmind_appended')
    console.log(target)
    document.body.removeChild(target)
}

function selectVideo(token) {
    videos = document.getElementsByTagName('video')
    if (videos.length != 0) {
        var element = videos[0].getBoundingClientRect();
        var top = element.top;
        var left = element.left;
        var width = element.width;
        var height = element.height;

        // var lecture_layer = document.createElement('div');
        // lecture_layer.setAttribute(id, 'lecture_layer')
        // lecture_layer.appendChild(lecmind_layout)

        var lecmind_video_layer = document.createElement('img');
        lecmind_video_layer.setAttribute('id', 'lecmind_video_layer')
        lecmind_video_layer.setAttribute('src', "https://png.pngtree.com/background/20210714/original/pngtree-dark-blue-solid-color-background-wallpaper-picture-image_1219002.jpg")
        // lecmind_video_layer.setAttribute(classname, "lecture_play_img")
        lecmind_video_layer.style.width = element.width + 'px';
        lecmind_video_layer.style.height = element.height + 'px';
        lecmind_video_layer.style.opacity = '0.4'

        var lecmind_video_btn = document.createElement('img');
        lecmind_video_btn.style.position = 'absolute';
        lecmind_video_btn.style.top = (element.height / 2 - 64) + 'px'
        lecmind_video_btn.style.left = (element.width / 2 - 64) + 'px'
        lecmind_video_btn.style.cursor = 'pointer';
        lecmind_video_btn.setAttribute('id', "lecmind_video_btn")
        lecmind_video_btn.setAttribute('src', "https://cdn-icons-png.flaticon.com/128/149/149125.png")
        lecmind_video_btn.onclick = (e) => chrome.runtime.sendMessage({type: "setLecture", token : token}, response => {console.log("setLecture");})

        var lecmind_guide_panel = document.createElement('div')
        lecmind_guide_panel.setAttribute('id', 'lecmind_guide_panel')
        lecmind_guide_panel.style.position = 'absolute';
        lecmind_guide_panel.style.backgroundColor = "white"
        lecmind_guide_panel.style.width = "300px"
        lecmind_guide_panel.style.height = "50px"
        lecmind_guide_panel.style.borderRadius = "20px"
        lecmind_guide_panel.style.top = '400px'
        lecmind_guide_panel.style.left = (document.body.clientWidth / 2 - 150)+ 'px'
        lecmind_guide_panel.style.boxShadow = "2px 3px 5px 0px";
        lecmind_guide_panel.style.textAlign = "center";
        lecmind_guide_panel.innerHTML += '<div id="guide_text" style="margin-top: 15px;"><h2>수강할 영상을 선택해주세요!</h2></div>'

        var lecmind_guide_container = document.createElement('div'); 
        lecmind_guide_container.setAttribute('id', 'lecmind_guide_container')
        lecmind_guide_container.style.top = element.top + 'px'; // 인식이 잘 안됨
        lecmind_guide_container.style.left = left + 'px';
        lecmind_guide_container.style.width = width + 'px';
        lecmind_guide_container.style.height = height + 'px';
        lecmind_guide_container.style.position = 'absolute';
        lecmind_guide_container.style.display = 'flex';
        lecmind_guide_container.style.justifyContent = 'center';
        lecmind_guide_container.style.alignItems = 'center';

        var lecmind_container = document.createElement('div'); 
        lecmind_container.setAttribute('id', 'lecmind_container');
        lecmind_container.style.zIndex= 2147483644;
        lecmind_container.style.position= 'fixed';
        lecmind_container.style.top= '0px';
        lecmind_container.style.left= '0px';
        lecmind_container.style.width= '100vw';
        lecmind_container.style.height= '100vh';
        lecmind_container.style.backgroundColor= 'rgba(206, 212, 218, 0.5)';
        lecmind_container.style.cursor= 'not-allowed';

        

        lecmind_guide_container.appendChild(lecmind_video_layer)
        lecmind_guide_container.appendChild(lecmind_video_btn)
        lecmind_guide_container.appendChild(lecmind_guide_panel)
        lecmind_container.appendChild(lecmind_guide_container)
        document.body.appendChild(lecmind_container)
    } 
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        const id = tabs[0].id
        if (message.type === 'selectVideo') {
            sendResponse({work: 'welcome!'})
            var token = message.token
            chrome.scripting.executeScript({target: { tabId: id }, func: selectVideo, args: [token]})
            //chrome.scripting.executeScript({target: { tabId: id}, files: [injectedScript.bundle.js]})
        }
        else if (message.type === 'setLecture') {
            sendResponse({work: 'welcome!'})
            var token = message.token
            var url = tabs[0].url
            var video_id = url.split('=')[1]
            chrome.scripting.executeScript({target: { tabId: id }, func: setLecture, args: [token, video_id]})
        }
    });
    return true;
});

// chrome.runtime.onConnect.addListener(function(port) {
//     if (port.name === "popup") {
//         port.onDisconnect.addListener(function() {
//             chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
//                 id = tabs[0].id
//                 chrome.scripting.executeScript({target: { tabId: id }, func: deleteSelectArea})
//             });
//         });
//     }
// });