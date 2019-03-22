import React from "react";
import "../index.css";
class TweetFormat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={this.props.style}>
        <header>
          <img src={this.props.status["user"]["profile_image_url"]} />
          <div className="profile-name">
            <h3>{this.props.status["user"]["name"]}</h3>
            <h4>{this.props.status["user"]["screen_name"]}</h4>
          </div>
          <div className="follow-btn">
            <button>Follow</button>
          </div>
        </header>
        <div id="inner">
          <p>{this.props.status["text"]}</p>
          <span className="date">{this.props.status["created_at"]}</span>
          <hr />
        </div>
        <footer>
          <div className="stats">
            <div className="Retweets">
              <strong>{this.props.status["retweet_count"]}</strong> Retweets
            </div>
            <div className="likes">
              <strong>{this.props.status["favorite_count"]}</strong> Likes
            </div>
          </div>
          <div className="cta">
            <button className="share-btn">Share</button>
            <button className="retweet-btn">Retweet</button>
            <button className="like-btn">Like</button>
          </div>
        </footer>
        <hr />
      </div>
    );
  }
}

export default TweetFormat;
