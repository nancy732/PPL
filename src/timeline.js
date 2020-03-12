import React from "react";
import Post from "./post";
import Upload from "./Upload";
import axios from "axios";
import Onload from "./onload posts";
import PaginacionTabla from "./pagination";

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    var show = localStorage.getItem("checkLogin");

    if (show == "false") {
      props.history.push("/login");
    }
    this.state = {
      click: false,
      check: false,
      data: "",
      postArray: [],
      buttonCategory: ""
    };
  }
  componentDidMount = () => {
    this.props.handleClicks(true);
    axios
      .get("http://localhost:8081/onload")
      .then(data => {
        console.log("onload", data.data);
        this.setState({ postArray: data.data });
      })
      .catch(err => console.log(err));
  };
  createPost = () => {
    console.log("createpost");
    const res = this.state.postArray;
    if (this.state.buttonCategory === "") {
      const result = res.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return result;
    } else {
      const result = res.filter(res => {
        return res.category == this.state.buttonCategory;
      });
      const results = result.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return results;
    }
  };

  buttoncategory = e => {
    this.setState({
      buttonCategory: e.target.name
    });
  };

  handleUploadClick = e => {
    this.setState({
      click: e
    });
  };
  handleUploadCheck = (e, data) => {
    this.setState({
      check: e,
      data: data
    });
  };

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link
          href="css/bootstrap-responsive.css"
          rel="stylesheet"
          type="text/css"
        />

        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div onClick={this.handleUploadClick} className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_iconb.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a>Upload Post</a>{" "}
              </div>
              <div className="rght_btn">
                {" "}
                <span className="rght_btn_icon">
                  <img src="images/btn_icona.png" alt="up" />
                </span>{" "}
                <span className="btn_sep">
                  <img src="images/btn_sep.png" alt="sep" />
                </span>{" "}
                <a onClick={this.buttoncategory} name="">
                  Categories
                </a>{" "}
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">
                  Categories
                </div>
                <div className="rght_list">
                  <ul>
                    <li>
                      <a onClick={this.buttoncategory} name="Cats">
                        <span className="list_icon">
                          <img src="images/icon_01.png" alt="up" />
                        </span>{" "}
                        Cats
                      </a>
                    </li>
                    <li>
                      <a onClick={this.buttoncategory} name="Dogs">
                        <span className="list_icon">
                          <img src="images/icon_02.png" alt="up" />
                        </span>{" "}
                        Dogs
                      </a>
                    </li>
                    <li>
                      <a onClick={this.buttoncategory} name="Birds">
                        <span className="list_icon">
                          <img src="images/icon_03.png" alt="up" />
                        </span>{" "}
                        Birds
                      </a>
                    </li>
                    <li>
                      <a onClick={this.buttoncategory} name="Rabbits">
                        <span className="list_icon">
                          <img src="images/icon_04.png" alt="up" />
                        </span>{" "}
                        Rabbit
                      </a>
                    </li>
                    <li>
                      <a onClick={this.buttoncategory} name="Others">
                        <span className="list_icon">
                          <img src="images/icon_05.png" alt="up" />
                        </span>{" "}
                        Others
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="opn_cat_bg">
                  Featured
                </div>
                <div className="sub_dwn">
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img1.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img2.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img">
                      <img src="images/feat_img3.png" alt="image" />
                    </div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends
                    </li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged
                    </li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.png" />
                      <div className="profile_text">
                        <a href="#">Change Profile Pic</a>
                      </div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div">
                        <a href="#">
                          Edit <img src="images/timeline_img.png" />
                        </a>
                      </div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">Stefiney Gibbs</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">
                              This is an example of a comment. You can create as
                              many comments like this one or sub comments as you
                              like and manage all of your content inside
                              Account.
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li>
                        <a href="#" className="active">
                          Timeline{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#">About </a>
                      </li>
                      <li>
                        <a href="#">Album</a>
                      </li>
                      <li>
                        <a href="#"> Pets</a>
                      </li>
                      <li>
                        <a href="#">My Uploads </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="post_txt">New Post Updates</div>

              <div className={this.state.click ? "contnt_2 div_a" : null}>
                {this.state.click ? (
                  <Post
                    UploadClick={this.props.checkEmail}
                    click={this.handleUploadClick}
                    check={this.handleUploadCheck}
                  />
                ) : null}{" "}
              </div>
              <div className={this.state.check ? "contnt_2 div_a" : null}>
                {this.state.check ? <Upload data={this.state.data} /> : null}{" "}
              </div>
              <div className={this.state.check ? "contnt_2 div_a" : null}>
                {" "}
              </div>
              <div>
                <PaginacionTabla
                  itemsperpage={5}
                  nocolumns={1}
                  items={this.createPost()}
                  pagesspan={4}
                />
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}
export default Timeline;
