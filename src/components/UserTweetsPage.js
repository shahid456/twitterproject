import React from "react";
import UserLists from "./UsersList";
import "../index.css";
class UserTweetsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let value = [];
    value = this.props.users;
    return (
      <div>
        <ul className="list">
          {value.map((item, index) => (
            <li key={item["name"] + index}>
              <UserLists user={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserTweetsPage;
