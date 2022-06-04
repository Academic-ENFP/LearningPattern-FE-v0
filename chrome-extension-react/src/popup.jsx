import React from "react";
import { render } from "react-dom";
import Popup from "./components/Popup";
import PopupSignedIn from "./components/PopupSignedIn";
import Cookies from "js-cookie";
import axios from "axios";

const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
var signed = false;
const csrftoken = Cookies.get("csrftoken");
const refreshtoken = Cookies.get("refreshToken");
console.log(csrftoken, refreshtoken);
axios
    .post(
        `http://127.0.0.1:8000/api-token-verify/`,
        {
            token: refreshtoken,
        },
        {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
    )
    .then((response) => {
        render(<PopupSignedIn />, document.querySelector("#popup"));
    })
    .catch((error) => {
        render(<Popup />, document.querySelector("#popup"));
    });
