import React from "react";
import "../index.css";
import { DebounceInput } from "react-debounce-input";
import { TWEET_SEARCH } from "../constants/api-endpoints";
import { NAME_SEARCH } from "../constants/api-endpoints";
import { USERNAME_SEARCH } from "../constants/api-endpoints";
import { Link } from "react-router-dom";
import TweetsPage from "./TweetsPage";
import TweetFormat from "./TweetFormat";
import { TWEET_PATH, USER_PATH } from "../constants/routes";
class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      predictions: [],
      userIds: [],
      statuses: [],
      show: false
    };
  }
  search = () => {
    if (this.state.show) {
      this.setState({
        show: false
      });
    } else {
      this.setState({
        show: true
      });
    }
  };

  showTweets = e => {
    let id = e.target.value;
    console.log("id", id);
  };
  getURL = value => {
    let url = "";
    let queryValue = "";
    let query = "";
    if (value[0] == "@") {
      url = USERNAME_SEARCH;
      queryValue = encodeURIComponent(value);
      query = "screen_name=" + queryValue;
    } else if (value[0] == "#") {
      url = NAME_SEARCH;
      queryValue = encodeURIComponent(value.slice(1, value.length));
      query = "q=" + queryValue;
    } else {
      url = NAME_SEARCH;
      queryValue = encodeURIComponent(value);
      query = "q=" + queryValue;
    }
    return [url, query];
  };

  getPredictions = (data, value) => {
    let predicted = [];
    let predictedIds = [];
    if (value[0] == "@") {
      let name = "@" + data["screen_name"] + " " + data["name"];
      predicted.push(name);
      predictedIds.push(data["id_str"]);
    } else if (value[0] == "#") {
      let len = 0;
      data.length > 4 ? (len = 5) : (len = data.length);
      for (let k = 0; k < len; k++) {
        predicted.push(data[k]["name"]);
        predictedIds.push(data[k]["screen_name"]);
      }
    } else {
      let len = 0;
      data.length > 4 ? (len = 5) : (len = data.length);
      for (let k = 0; k < len; k++) {
        predicted.push(data[k]["name"]);
        predictedIds.push(data[k]["screen_name"]);
      }
    }
    return [predicted, predictedIds];
  };
  updateState = value => {
    let urlQuery = this.getURL(value);
    let url = urlQuery[0] + urlQuery[1];
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
        let predicted = this.getPredictions(data, value);
        this.setState({
          predictions: predicted[0],
          userIds: predicted[1]
        });
      })
      .catch(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  };
  onChange = e => {
    let value = e.target.value;
    this.setState({
      value: value
    });
    if (value.length > 1) {
      this.updateState(value);
    } else {
      this.setState({
        predictions: [],
        userIds: []
      });
    }
  };
  render() {
    return (
      <div id="search">
        <div id="container1">
          <DebounceInput
            id="searchin"
            minLength={1}
            debounceTimeout={100}
            type="text"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button type="button" id="btnsearch" onClick={this.search}>
            <Link
              to={{
                pathname: "/TweetsPage",
                state: this.state.value
              }}
            >
              Search
            </Link>
          </button>
        </div>
        <div id="container2">
          <ul id="list">
            {this.state.predictions.map((item, index) => (
              <li key={index + item}>
                {this.state.value[0] == "#" ? (
                  <Link
                    to={{
                      pathname: USER_PATH,
                      state: this.state.userIds[index]
                    }}
                  >
                    {item}
                  </Link>
                ) : this.state.value[0] == "@" ? (
                  <Link
                    to={{
                      pathname: USER_PATH,
                      state: this.state.value
                    }}
                  >
                    {item}
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: USER_PATH,
                      state: this.state.userIds[index]
                    }}
                  >
                    {item}
                  </Link>
                )}
              </li>
            ))}
            <li key={"All Result"}>
              <Link to={{ pathname: TWEET_PATH, state: this.state.value }}>
                See All Results
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchPage;
