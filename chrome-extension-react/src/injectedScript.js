function selectVideo() {
    document.querySelector(".lecture_select_btn").addEventListener('click', open);

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
        var body = document.querySelector('body');
        body.appendChild(new_div)
        

        var img = document.querySelector('#lecmind_layout')
        img.style.width = element.width + 'px';
        img.style.height = element.height + 'px';
        img.style.opacity = '0.4'

        var select_guide = document.createElement('div')
        select_guide.setAttribute('id', 'guide_textbox')
        select_guide.innerHTML += '<div id="guide_text"><h2>수강할 영상을 선택해주세요!</h2></div>'
        select_guide.style.position = 'absolute';
        select_guide.style.backgroundColor = "white"
        select_guide.style.width = "300px"
        select_guide.style.height = "50px"
        select_guide.style.borderRadius = "20px"
        select_guide.style.top = -(new_div.offsetTop / 2)+ 'px'
        select_guide.style.boxShadow = "2px 3px 5px 0px";
        
        var new_btn = document.createElement('div');
        new_btn.innerHTML +=  '<a href="#" class="lecture_select_btn" style={btnstyle}><img src="https://cdn-icons-png.flaticon.com/128/149/149125.png" /></a>';
        document.querySelector('#lecture_layer').appendChild(new_btn); // new_div 안쪽으로 들어감
        new_btn.style.position = 'absolute';
        new_btn.style.top = (new_div.offsetHeight / 4) + 'px'
        new_btn.style.left = (new_div.offsetWidth / 3) + 'px'
        
        var inputPop = document.createElement('div');
        inputPop.innerHTML += '<div class="background" style={bgstyle}><div class="window" style={winstyle}><div class="subject_input_pop style={popstyle}><form id="form" style={formstyle}><h2>과목을 입력해주세요.</h2><input type="text"/><input onclick="self.close();" type="submit" value="확인" /><input onclick="self.close();" type="reset" value="취소" /></form></div></div></div>'
        new_btn.appendChild(inputPop)
    }
}

function open () {
    document.querySelector(".background").className = "background lecture_select_btn";
}

function close () {
    document.querySelector(".background").className = "background";
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

    /* 숨기기 */
    zIndex: -1,
    opacity: 0,
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