import React from "react";
import { USER_TIMELINE } from "../constants/api-endpoints";

import UserFormat from "./UserFormat";

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.location.state);
    console.log(this.props.location.state);
    fetch(
      USER_TIMELINE +
        "screen_name" +
        this.props.location.state +
        "&include_rts=false&exclude_replies=true"
    )
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
        console.log(data);
      })
      .catchfunction(function(err) {
        console.log("Fetch Erro :-S", err);
      });
  }
  render() {
    return (
      <div>
        <h1>{this.props.location.state}</h1>
      </div>
    );
  }
}

export default UsersPage;
