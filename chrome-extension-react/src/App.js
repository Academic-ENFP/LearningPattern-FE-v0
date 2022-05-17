import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home/Home"
import Signin from "./components/Signin/Signin"
import Result from "./components/Result/Result"
import LearningPage from "./components/LearningPage/LearningPage";
import Timestamp from "./components/Timestamp/Timestamp"

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path = "/" component={Home} />
                <Route path = "/Signin" component={Signin} />
                <Route path = "/LearningPage" component={LearningPage} />
                <Route exact path = "/Result" component={Result} />
                <Route exact path = "/Timestamp" component={Timestamp} />
            </Switch>
        </Router>
    )
}

export default App;