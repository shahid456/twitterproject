import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import {
  TWEET_SEARCH,
  NAME_SEARCH,
  INC_ENTITIES
} from "../constants/api-endpoints";
import TweetsFormat from "./TweetFormat";
import "../index.css";
class TweetsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: "",
      users: "",
      isLoading: false,
      cursor: 0
    };
  }

  componentDidMount() {
    let value = this.props.location.state;
    let url = TWEET_SEARCH + "q=" + encodeURIComponent(value) + INC_ENTITIES;
    this.setTweetsUsers(url, "#");
    let url1 =
      NAME_SEARCH +
      "q=" +
      encodeURIComponent(value.slice(1, value.length)) +
      "&count=20";
    this.setTweetsUsers(url1, "@");
  }
  setTweetsUsers = (url, check) => {
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return null;
        }
        return response.json();
      })
      .then(data => {
        if (check == "#") {
          this.setState({
            tweets: data["statuses"]
          });
        } else {
          this.setState({
            users: data
          });
        }
      })
      .catch(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  };

  loadMore = () => {
    let url =
      TWEET_SEARCH +
      "q=" +
      encodeURIComponent(this.props.location.state) +
      INC_ENTITIES;
    this.setState({ isLoading: true, error: undefined });
    fetch(url)
      .then(res => res.json())
      .then(
        res => {
          let status = res["statuses"];
          let len = this.state.tweets.length;
          let tweets = [...this.state.tweets, ...status];
          console.log(tweets);
          console.log(status);
          len = tweets.length == len;
          this.setState({
            tweets: [...this.state.tweets, ...status],
            cursor: len,
            isLoading: false
          });
        },
        error => {
          this.setState({ isLoading: false, error });
        }
      );
  };

  loadTweets = () => {
    this.loadMore();
  };
  loadUsers = () => {
    console.log(this.state.users);
  };
  render() {
    return (
      <div>
        <div className="TitleBar">
          <h1 className="textAlign">{this.props.location.state}</h1>
        </div>
        <div className="NavBar">
          <button className="btnNav" onClick={this.loadTweets}>
            Tweets
          </button>
          <button className="btnNav" onClick={this.loadUsers}>
            Users
          </button>
        </div>
        <div style={{ height: "700px, overflow, auto" }}>
          <InfiniteScroll
            pageStart={0}
            loader={
              <div className="loader" key={0}>
                Loading...
              </div>
            }
            hasMore={!!this.state.cursor}
            loadMore={this.loadMore}
          >
            {this.state.tweets.length > 0
              ? this.state.tweets.map(item => (
                  <TweetsFormat key={item["id_str"]} status={item} />
                ))
              : null}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default TweetsPage;
