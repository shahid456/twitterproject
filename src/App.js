import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import TweetsPage from "./components/TweetsPage";
import UsersPage from "./components/UsersPage";
import { TWEET_PATH, USER_PATH } from "./constants/routes";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route path={TWEET_PATH} component={TweetsPage} />
          <Route path={USER_PATH} component={UsersPage} />
        </Switch>
      </Router>
    );
  }
}
export default App;
