import React from "react";
import { Redirect } from "react-router-dom";
import SinglePost from "./singlePost";

class Onload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      like: "",
      unlike: "",
      buttonClicked: "",
      email: localStorage.getItem("email")
    };
  }
  componentDidMount = e => {
    this.setState({
      like: this.props.res.like.length,
      unlike: this.props.res.unlike.length
    });
  };
  handleImageClick = e => {
    this.setState({
      click: true
    });
  };

  render() {
    console.log("onload", this.props);

    return (
      <div>
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">{this.props.res.PostName}</div>
            <div className="btm_rgt">
              <div className="btm_arc">{this.props.res.category}</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                <img src="images/img_6.png" />
                {this.props.res.email}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">
                  {new Date(this.props.res.date).toLocaleDateString()}
                </span>
                <span className="span_time">
                  {new Date(this.props.res.date).toLocaleTimeString()}
                </span>
              </div>
            </div>
            <div className="div_image" onClick={this.handleImageClick}>
              <img
                src={`http://localhost:8081/profile/${this.props.res.fileName}`}
                alt="pet"
              />
            </div>

            {this.state.click ? (
              <Redirect
                to={{ pathname: "/singlePost", state: this.props.res }}
              />
            ) : null}
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_001.png" alt="share" />
                      </span>
                      Share
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_002.png" alt="share" />
                      </span>
                      Flag
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleImageClick}>
                      <span className="btn_icon">
                        <img src="images/icon_004.png" alt="share" />
                      </span>
                      {this.props.res.comment.length} Comments
                    </a>
                  </li>
                  <li>
                    <a onClick={this.handleImageClick}>
                      <span className="btn_icon">
                        <img src="images/icon_003.png" alt="share" />
                      </span>
                      Likes
                    </a>
                  </li>
                  <div className="like_count" style={{ marginRight: "10px" }}>
                    <span className="lft_cnt" />
                    <span className="mid_cnt">
                      {this.props.res.like.length}
                    </span>
                    <span className="rit_cnt" />
                  </div>
                  <li>
                    <a onClick={this.handleImageClick}>
                      <span className="btn_icon">
                        <img src="images/icon_003.png" alt="share" />
                      </span>
                      Unlike
                    </a>
                  </li>
                  <div className="like_count">
                    <span className="lft_cnt" />
                    <span className="mid_cnt">
                      {this.props.res.unlike.length}
                    </span>
                    <span className="rit_cnt" />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Onload;
