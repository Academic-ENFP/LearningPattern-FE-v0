import React, { Component } from 'react';
import Cookies from 'js-cookie'
import axios from "axios"
import Popup from './components/Popup';
import PopupSignedIn from './components/PopupSignedIn';
class App extends Component {
    render() {
        const csrftoken = Cookies.get('csrftoken')
        const refreshtoken = Cookies.get('refreshToken')
        console.log(csrftoken, refreshtoken)
        axios.post(`http://127.0.0.1:8000/api-token-verify/`, 
        {
            token: refreshtoken
        },
        {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken,
        }).then(response => {
            console.log('!!')
            return (
                <div>
                    <PopupSignedIn/>
                </div>
                
            )
        })
        .catch(error => {
            console.log('!!!')
            return (
                <div>
                    <Popup/>
                </div>
            )
        });
    }
}
export default App;