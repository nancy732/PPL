import React from "react";
import Comments from "./comment";
import axios from "axios";
class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    var show = localStorage.getItem("checkLogin");

    if (show == "false") {
      props.history.push("/login");
    }
    console.log(this.props);
    this.state = {
      like: "",
      comment: "",
      unlike: "",
      commentSubmit: false,
      commentLength: "",
      email: localStorage.getItem("email"),
      res: [],
      mail: []
    };
  }
  componentDidMount = () => {
    this.props.handleClicks(true);
    this.setState({
      like: this.props.location.state.like.length,
      unlike: this.props.location.state.unlike.length,
      commentLength: this.props.location.state.comment.length
    });
    const user = {
      _id: this.props.location.state._id,
      email: this.state.email,
      comment: this.state.comment
    };

    axios
      .post("http://localhost:8081/manageComment", user)
      .then(data => {
        this.setState({
          commentSubmit: true,
          commentLength: data.data[0].comment.length,
          res: data.data[0].comment,
          mail: data.data[0].commentMail
        });

        console.log("comment", data.data[0].commentMail);
      })
      .catch(err => console.log(err));
  };

  handlelikes = e => {
    e.preventDefault();
    const user = {
      _id: this.props.location.state._id,
      email: this.state.email
    };
    axios
      .post("http://localhost:8081/manageLikes", user)
      .then(data => {
        console.log("likes", data.data[0].like.length);
        this.setState({ like: data.data[0].like.length });
      })
      .catch(err => console.log(err));
  };

  handleUnlikes = e => {
    e.preventDefault();
    const user = {
      _id: this.props.location.state._id,
      email: this.state.email
    };
    axios
      .post("http://localhost:8081/manageUnlike", user)
      .then(data => {
        console.log("unlike", data.data.length);
        this.setState({ unlike: data.data[0].unlike.length });
      })
      .catch(err => console.log(err));
  };
  commentChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCommentSubmit = e => {
    e.preventDefault();
    const user = {
      _id: this.props.location.state._id,
      comment: this.state.comment,
      email: this.state.email
    };

    axios
      .post("http://localhost:8081/manageComments", user)
      .then(data => {
        this.setState({
          commentSubmit: true,
          comment: "",
          commentLength: data.data[0].comment.length,
          res: data.data[0].comment,
          mail: data.data[0].commentMail
        });

        console.log("comment", data.data[0].commentMail);
      })
      .catch(err => console.log(err));
  };

  createComment = () => {
    const result = this.state.res.map((res, index) => {
      console.log("mail", res, this.state.mail[index]);
      let mailResponse = this.state.mail[index];
      return (
        <div>
          <li>
            <Comments res={res} mailResponse={mailResponse} />
            <input type="button" defaultValue="Reply" className="orng_btn" />
          </li>
        </div>
      );
    });
    return result;
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Singal Post</title>
        <link href="/css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link
          href="/css/bootstrap-responsive.css"
          rel="stylesheet"
          type="text/css"
        />
        <div className="container">
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">
                {this.props.location.state.PostName}
              </div>
              <div className="btm_rgt">
                <div className="btm_arc">
                  {this.props.location.state.category}
                </div>
              </div>
              <div className="div_top">
                <div className="div_top_lft">
                  <img src="/images/img_6.png" />
                  {this.props.location.state.email}
                </div>
                <div className="div_top_rgt">
                  <span className="span_date">
                    {new Date(
                      this.props.location.state.date
                    ).toLocaleDateString()}
                  </span>
                  <span className="span_time">
                    {new Date(
                      this.props.location.state.date
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
              <div className="div_image" onClick={this.handleImageClick}>
                <img
                  src={`http://localhost:8081/profile/${this.props.location.state.fileName}`}
                  alt="pet"
                />
              </div>
            </div>
          </div>

          <div className="div_btm">
            <div className="btm_list">
              <ul>
                <li>
                  <a>
                    <span className="btn_icon">
                      <img src="/images/icon_001.png" alt="share" />
                    </span>
                    Share
                  </a>
                </li>
                <li>
                  <a>
                    <span className="btn_icon">
                      <img src="/images/icon_002.png" alt="share" />
                    </span>
                    Flag
                  </a>
                </li>
                <li>
                  <a>
                    <span className="btn_icon">
                      <img src="/images/icon_004.png" alt="share" />
                    </span>
                    {this.state.commentLength} Comments
                  </a>
                </li>
                <li>
                  <a onClick={this.handlelikes}>
                    <span className="btn_icon">
                      <img src="/images/icon_003.png" alt="share" />
                    </span>
                    Likes
                  </a>
                </li>
                <div className="like_count" style={{ marginRight: "10px" }}>
                  <span className="lft_cnt" />
                  <span className="mid_cnt">{this.state.like}</span>
                  <span className="rit_cnt" />
                </div>
                <li>
                  <a onClick={this.handleUnlikes}>
                    <span className="btn_icon">
                      <img src="/images/icon_003.png" alt="share" />
                    </span>
                    Unlike
                  </a>
                </li>
                <div className="like_count">
                  <span className="lft_cnt" />
                  <span className="mid_cnt">{this.state.unlike}</span>
                  <span className="rit_cnt" />
                </div>
              </ul>
            </div>
          </div>
          <div className="contnt_3">
            <ul>
              {this.state.commentSubmit ? this.createComment() : null}
              <li>
                <div className="cmnt_div1">
                  <input
                    type="text"
                    onChange={this.commentChange}
                    name="comment"
                    placeholder="Enter your Comment"
                    className="cmnt_bx1"
                  />
                  <input
                    onClick={this.handleCommentSubmit}
                    type="submit"
                    className="sub_bttn1"
                    defaultValue="Submit Comment"
                  />
                </div>
              </li>
            </ul>
            <div className="view_div">
              <a href="/#">View more</a>
            </div>
          </div>
        </div>

        <div className="clear" />
      </div>
    );
  }
}
export default SinglePost;
