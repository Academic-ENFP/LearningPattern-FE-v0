import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Home/Home.js";
import Signin from "./Signin/Signin.js"
import Result from "./Result/Result.js"
import LearningPage from "./LearningPage/LearningPage.js";
import Timestamp from "./Timestamp/Timestamp.js"

function App() {
    return (
        <Router>
            <Switch>
                <Route path = "/" component={Home} exact />
                <Route path = "/Signin" component={Signin} />
                {/* <Route exact path = "/LearningPage">
                    <LearningPage />
                </Route>
                <Route exact path = "/Result">
                    <Result />
                </Route>
                <Route exact path = "/Timestamp">
                    <Timestamp />
                </Route> */}
            </Switch>
        </Router>
    )
}

export default App;