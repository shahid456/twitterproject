import React from "react";
import { TWEET_SEARCH } from "../constants/api-endpoints";

import TweetsFormat from "./TweetFormat";
class TweetsPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <TweetsFormat status={this.props.location.state[0]} />
        <TweetsFormat status={this.props.location.state[1]} />
      </div>
    );
  }
}

export default TweetsPage;
