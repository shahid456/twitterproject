import React, { Fragment } from "react";
import TweetsWrapper from "./TweetsWrapper";
import { FindMin } from "../utils/findMin";
import {
  TWEET_SEARCH,
  NAME_SEARCH,
  INC_ENTITIES
} from "../constants/api-endpoints";
import TweetsFormat from "./TweetFormat";
import UserTweetsPage from "./UserTweetsPage";
import "../index.css";
class TweetsPageTesting extends React.PureComponent {
  state = {
    hasNextPage: true,
    isNextPageLoading: false,
    items: [],
    tweets: [],
    users: [],
    searchTweets: true,
    searchUsers: false
  };
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
  _loadNextPage = (...args) => {
    this.setState({ isNextPageLoading: true }, () => {
      let value = this.props.location.state;
      value = encodeURIComponent(value);
      let url = "";
      if (this.state.items.length == 0) {
        url = TWEET_SEARCH + "q=" + value + INC_ENTITIES;
      } else {
        url =
          TWEET_SEARCH +
          "q=" +
          value +
          INC_ENTITIES +
          "&max_id=" +
          (FindMin(this.state.tweets) - 100);
      }
      this.setTweetsUsers(url, "#");
      setTimeout(() => {
        this.setState(state => ({
          hasNextPage: state.items.length < 100,
          isNextPageLoading: false,
          items: [...state.items].concat(...state.tweets)
        }));
      }, 3500);
    });
  };
  showTweets = () => {
    this.setState({
      searchTweets: true,
      searchUsers: false,
      items: []
    });
  };
  showUsers = () => {
    this.setState({
      searchTweets: false,
      searchUsers: true,
      items: []
    });
  };
  componentDidMount() {
    let value = this.props.location.state;
    this.setTweetsUsers(
      NAME_SEARCH + "q=" + value.slice(1, value.length) + "&page=10&count=5"
    );
  }
  render() {
    const hasNextPage = this.state.hasNextPage;
    const isNextPageLoading = this.state.isNextPageLoading;
    const items = this.state.items;
    return (
      <Fragment>
        <div className="TitleBar">
          <h1 className="textAlign">{this.props.location.state}</h1>
        </div>
        <div className="NavBar">
          <button className="btnNav" onClick={this.showTweets}>
            Tweets
          </button>
          <button className="btnNav" onClick={this.showUsers}>
            Users
          </button>
        </div>
        {this.state.searchTweets ? (
          <div>
            <TweetsWrapper
              hasNextPage={hasNextPage}
              isNextPageLoading={isNextPageLoading}
              items={items}
              loadNextPage={this._loadNextPage}
            />
          </div>
        ) : (
          <UserTweetsPage users={this.state.users} />
        )}
      </Fragment>
    );
  }
}
export default TweetsPageTesting;
