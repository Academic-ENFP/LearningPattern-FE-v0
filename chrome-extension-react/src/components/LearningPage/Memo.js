import React from "react";
import { render } from "react-dom";
import '../../css/memo.css'

//innerHTML쓰면 팝업 안에 memo.html 넣고 player.html 넣으면 되는건가 ,,,,?


function Memo() {
    
    return (
        <div class="container">
            <form>
                <div class="title">
                    <textarea class="title_input" id="title_input" rows="1" maxlength="50" minlength="3" placeholder="제목을 입력하세요."></textarea>
                </div>
                <div class="content">
                    <textarea class="content_input" id="content_input" rows="19" maxlength="1000" minlength="10" placeholder="작성할 내용을 입력하세요."></textarea>
                </div>
                {/* <span class="textarea_count">0/1000 (최대 1000자)</span> */}
            </form>
        </div>
    )
}



export default Memo;