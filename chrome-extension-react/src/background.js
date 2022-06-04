var accessToken = ''

const btnstyle = {
    // opacity: 1,
    // zIndex: 1000,
    // transition: 'all .5s',
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

function setLecture(video_id) {
    fetch(`http://127.0.0.1:8000/api/lecture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "video_id": video_id,
        "name": "temp",
        "degree": "",
        "complet_date": "",
        "lecture_time": "",
        "learning_time": "",
        "state": "",
        "subject": "temp"
      }),
    }).then(res => {
      if(res.ok) {
        alert("생성이 완료되었습니다.")
      }
    })
    
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

function selectVideo() {
    videos = document.getElementsByTagName('video')
    if (videos.length != 0) {
        var element = videos[0].getBoundingClientRect();
        var top = element.top;
        var left = element.left;
        var width = element.width;
        var height = element.height;
        var new_div = document.createElement('div'); 
        new_div.setAttribute('id', 'lecmind_appended')

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
        select_guide.style.backgroundColor = "white"
        select_guide.style.width = "300px"
        select_guide.style.height = "50px"
        select_guide.style.borderRadius = "20px"
        select_guide.style.top = -(new_div.offsetTop / 2)+ 'px'
        select_guide.style.boxShadow = "2px 3px 5px 0px";
        select_guide.style.textAlign = "center";
        select_guide.innerHTML += '<div id="guide_text" style="margin-top: 15px;"><h2>수강할 영상을 선택해주세요!</h2></div>'
        new_div.appendChild(select_guide)
        
        var new_btn = document.createElement('div');
        new_btn.style.position = 'absolute';
        new_btn.style.top = (new_div.offsetHeight / 4) + 'px'
        new_btn.style.left = (new_div.offsetWidth / 3) + 'px'
        new_btn.innerHTML +=  '<img id="lecture_select_btn" style="cursor: pointer;" src="https://cdn-icons-png.flaticon.com/128/149/149125.png"/>';
        document.querySelector('#lecture_layer').appendChild(new_btn); // new_div 안쪽으로 들어감
        document.querySelector('#lecture_select_btn').onclick = chrome.runtime.sendMessage("setLecture", response => {console.log("setLecture");})
    } 
}



chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
        if (message === 'selectVideo') {
            sendResponse({work: 'welcome!'})
            id = tabs[0].id
            chrome.scripting.executeScript({target: { tabId: id }, func: selectVideo})
            //chrome.scripting.executeScript({target: { tabId: id}, files: [injectedScript.bundle.js]})
        }
        else if (message === 'setLecture') {
            sendResponse({work: 'welcome!'})
            id = tabs[0].id
            url = tabs[0].url
            video_id = url.split('=')[1]
            chrome.scripting.executeScript({target: { tabId: id }, func: setLecture, args: [video_id]})
        }
        else if (message.type === 'token') {
            sendResponse({work: 'welcome!'})
            accessToken = message.value
            console.log(accessToken)
        }
        else if (message === 'getToken') {
            sendResponse(accessToken)
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