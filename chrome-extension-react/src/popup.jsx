import React from "react";
import { render } from "react-dom";
import Popup from "./components/Popup";
import PopupSignedIn from "./components/PopupSignedIn";
import Cookies from "js-cookie";
import axios from "axios";

const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
// const csrftoken = Cookies.get("csrftoken");
// const refreshtoken = Cookies.get("refreshToken");

chrome.cookies.get(
  {
    name: "sessionid",
    url: "http://127.0.0.1:8000",
  },
  (cookie) => {
    if (cookie) {
      Cookies.set("sessionid", cookie.value);
      chrome.cookies.get(
        {
          name: "Authorization",
          url: "http://127.0.0.1:8000",
        },
        (authorization) => {
          Cookies.set("Authorization", authorization.value);
        }
      );
      render(<PopupSignedIn />, document.querySelector("#popup"));
    } else {
      render(<Popup />, document.querySelector("#popup"));
    }
  }
);

// const sessionid = Cookies.get("sessionid");
// console.log(sessionid);

// console.log(csrftoken, refreshtoken);
// axios
//   .post(
//     `http://127.0.0.1:8000/api-token-verify/`,
//     {
//       token: refreshtoken,
//     },
//     {
//       "Content-Type": "application/json",
//       "X-CSRFToken": csrftoken,
//     }
//   )
//   .then((response) => {
//     render(<PopupSignedIn />, document.querySelector("#popup"));
//   })
//   .catch((error) => {
//     render(<Popup />, document.querySelector("#popup"));
//   });
