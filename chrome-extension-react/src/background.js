// 이미지 전역변수

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

function viewer_close () {
    document.body.querySelector('#lecmind_container').remove()
}

function viewer_setScreenMode () {
    const expand_btn_url = 'https://drive.google.com/uc?export=download&id=1qPnjOOudToH6TsMVqPGxk53Mg0A7f-tm';
    const shrink_btn_url = 'https://drive.google.com/uc?export=download&id=1gQPdfX2cmuaTdCNS-yP1-WUUr0_DRTMG';
    // 전체화면 검사
    if (!window.screenTop && !window.screenY) {
        document.querySelector('#lecmind_viewer_screen_btn').setAttribute('src', expand_btn_url)
        document.exitFullscreen()
    }
    else {
        document.querySelector('#lecmind_viewer_screen_btn').setAttribute('src', shrink_btn_url)
        document.documentElement.requestFullscreen()
    }
    
}

function viewer_setShowMode () {
    const hide_btn_url = 'https://drive.google.com/uc?export=download&id=1iRUkQwKOva6Pe11gBNAw_gfdkA0NhIVb';
    const show_btn_url = 'https://drive.google.com/uc?export=download&id=16EedLOxEhzJi_KDW8UpN1ZynwG0sF4mF';
    if (document.body.querySelector('#lecmind_layer').style.display == '') {
        document.querySelector('#lecmind_viewer_show_btn').setAttribute('src', hide_btn_url)
        document.body.querySelector('#lecmind_layer').style.display = 'none'
    }
    else{
        document.querySelector('#lecmind_viewer_show_btn').setAttribute('src', show_btn_url)
        document.body.querySelector('#lecmind_layer').style.display = ''
    }
    
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
    })
    learning(video_id)
}

function learning(video_id){
    var lecmind_container = document.querySelector('#lecmind_container')
    var lecmind_layer = document.querySelector('#lecmind_layer')

    // loading
    var loading_url = 'https://drive.google.com/uc?export=download&id=1XCngqyGNxZVrFzSw0mxM8yIEpIqJry6L'
    var loading_panel = document.createElement('div')
    var loading_gif = document.createElement('img')

    loading_panel.setAttribute('id', 'loading_panel')
    loading_panel.style.position = 'absolute';
    loading_panel.style.backgroundColor = "white"
    loading_panel.style.width = "300px"
    loading_panel.style.height = "50px"
    loading_panel.style.borderRadius = "20px"
    loading_panel.style.top = (window.innerHeight / 2 - 250)+ 'px'
    loading_panel.style.left = (window.innerWidth / 2 - 150)+ 'px'
    loading_panel.style.boxShadow = "2px 3px 5px 0px";
    loading_panel.style.textAlign = "center";
    loading_panel.innerHTML += '<div id="guide_text" style="margin-top: 15px;"><h2>잠시만 기다려주세요!</h2></div>'
    loading_gif.setAttribute('src', loading_url)
    loading_gif.style.position = 'relative';
    loading_gif.style.marginTop = '60px'
    
    while (lecmind_layer.hasChildNodes()) {
        lecmind_layer.removeChild(lecmind_layer.firstChild);
    }
    loading_panel.appendChild(loading_gif)
    lecmind_layer.appendChild(loading_panel)
    lecmind_layer.style.backgroundColor= 'white'

    //load learningPage
    setTimeout(() => {
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
        
        // img url
        const close_btn_url = 'https://drive.google.com/uc?export=download&id=1-bssq5ahdNM23fhGwjM57Pf-njJL4Usc';
        const expand_btn_url = 'https://drive.google.com/uc?export=download&id=1qPnjOOudToH6TsMVqPGxk53Mg0A7f-tm';
        const show_btn_url = 'https://drive.google.com/uc?export=download&id=16EedLOxEhzJi_KDW8UpN1ZynwG0sF4mF';
        // 닫기 버튼
        var lecmind_viewer_close_btn = document.createElement('img');
        lecmind_viewer_close_btn.setAttribute('id', 'lecmind_viewer_close_btn');
        lecmind_viewer_close_btn.setAttribute('src', close_btn_url);
        lecmind_viewer_close_btn.style.cursor = 'pointer';
        lecmind_viewer_close_btn.style.width = '25px';
        lecmind_viewer_close_btn.style.display = 'inline';
        lecmind_viewer_close_btn.style.setProperty('margin-right', '0.3rem', 'important')
        lecmind_viewer_close_btn.onclick = () => viewer_close()

        // 전체화면 버튼
        var lecmind_viewer_screen_btn = document.createElement('img');
        lecmind_viewer_screen_btn.setAttribute('id', 'lecmind_viewer_screen_btn');
        lecmind_viewer_screen_btn.setAttribute('src', expand_btn_url);
        lecmind_viewer_screen_btn.style.cursor = 'pointer';
        lecmind_viewer_screen_btn.style.width = '25px';
        lecmind_viewer_screen_btn.style.display = 'inline';
        lecmind_viewer_screen_btn.style.setProperty('margin-right', '0.3rem', 'important')
        lecmind_viewer_screen_btn.onclick = () => viewer_setScreenMode();

        // 상태 버튼
        var lecmind_viewer_show_btn = document.createElement('img');
        lecmind_viewer_show_btn.setAttribute('id', 'lecmind_viewer_show_btn');
        lecmind_viewer_show_btn.setAttribute('src', show_btn_url);
        lecmind_viewer_show_btn.style.cursor = 'pointer';
        lecmind_viewer_show_btn.style.width = '25px';
        lecmind_viewer_show_btn.style.display = 'inline';
        lecmind_viewer_show_btn.onclick = () => viewer_setShowMode();

        var lecmind_viewer_controller = document.createElement('div')
        lecmind_viewer_controller.setAttribute('id', `lecmind_viewer_controller`);
        lecmind_viewer_controller.style.zIndex = 2147483647
        lecmind_viewer_controller.style.position = 'fixed';
        lecmind_viewer_controller.style.top = '20px';
        lecmind_viewer_controller.style.left = '20px';
        lecmind_viewer_controller.style.boxShadow = 'rgba(0, 0, 0, 0.15) 0px 0.5rem 1rem';
        lecmind_viewer_controller.style.backgroundColor = 'rgb(65, 65, 65)';
        lecmind_viewer_controller.style.borderRadius = '5px';
        lecmind_viewer_controller.style.setProperty("padding", "0.5rem", "important");
        lecmind_viewer_controller.appendChild(lecmind_viewer_close_btn)
        lecmind_viewer_controller.appendChild(lecmind_viewer_screen_btn)
        lecmind_viewer_controller.appendChild(lecmind_viewer_show_btn)

        while (lecmind_layer.hasChildNodes()) {
            lecmind_layer.removeChild(lecmind_layer.firstChild);
        }
        lecmind_container.appendChild(lecmind_viewer_controller)
        lecmind_layer.appendChild(iframe)
    }, 3000);
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

        var lecmind_layer = document.createElement('div'); 
        lecmind_layer.setAttribute('id', 'lecmind_layer');
        lecmind_layer.style.zIndex= 2147483644;
        lecmind_layer.style.position= 'fixed';
        lecmind_layer.style.top= '0px';
        lecmind_layer.style.left= '0px';
        lecmind_layer.style.width= '100vw';
        lecmind_layer.style.height= '100vh';
        lecmind_layer.style.backgroundColor= 'rgba(206, 212, 218, 0.5)';
        lecmind_layer.style.cursor= 'not-allowed';

        var lecmind_container = document.createElement('div'); 
        lecmind_container.setAttribute('id', 'lecmind_container');

        lecmind_guide_container.appendChild(lecmind_video_layer)
        lecmind_guide_container.appendChild(lecmind_video_btn)
        lecmind_guide_container.appendChild(lecmind_guide_panel)
        lecmind_layer.appendChild(lecmind_guide_container)
        lecmind_container.appendChild(lecmind_layer)
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