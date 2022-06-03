import React from "react";
import { render } from "react-dom";
import '../learningpage.css'

//강의 수강 페이지
function LearningPage(){
    
    document.querySelector("#learning_popup_open").addEventListener('click', open);
    document.querySelector("#learning_popup_close").addEventListener('click', close);    

    return (
        <div className="learningpage">
            <button id="learning_popup_open">팝업열기</button>

            <div class="background">
                <div class="window">
                    <div class="learning_popup">
                        <button id="learning_popup_close">팝업닫기</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

function open () {
    document.querySelector(".background").className = "background learning_popup_open";
}
  
function close () { 
    document.querySelector(".background").className = "background";
}
  

export default LearningPage;