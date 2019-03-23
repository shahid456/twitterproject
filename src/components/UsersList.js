import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { USER_PATH } from "../constants/routes";
class UsersList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <img src={this.props.user["profile_image_url"]} />
          <div className="profile-name">
            <Link
              to={{
                pathname: USER_PATH,
                state: this.props.user["screen_name"]
              }}
            >
              <h3>{this.props.user["name"]}</h3>
            </Link>
            <h4>{this.props.user["screen_name"]}</h4>
          </div>
          <div className="follow-btn">
            <button>Follow</button>
          </div>
        </header>
        <p>{this.props.user["description"]}</p>
        <hr />
      </div>
    );
  }
}
export default UsersList;
