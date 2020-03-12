import React from "react";
import Post from "./post";
import Upload from "./Upload";
import axios from "axios";
import Onload from "./onload posts";
//import InfiniteScroll from "react-infinite-scroll-component";
import ReactScrollablePagination from "react-scrollable-pagination";
import { withRouter } from "react-router-dom";

const Scroller = withRouter(ReactScrollablePagination);
class Explore extends React.Component {
  constructor(props) {
    super(props);
    console.log("props explore", props);
    var show = localStorage.getItem("checkLogin");

    if (show == "false") {
      props.history.push("/login");
    }
    this.state = {
      click: false,
      check: false,
      data: "",
      postArray: [],
      categoryArray: [],
      buttonCategory: "All",
      category: "",
      email: localStorage.getItem("email")
      //items: Array.from({ length: 5 })
    };
  }

  componentDidMount = () => {
    this.props.handleClicks(true);

    window.scrollTo(0, 0);
    axios
      .get("http://localhost:8081/onload")
      .then(data => {
        this.setState({ postArray: data.data });
      })
      .catch(err => console.log(err));

    axios
      .get("http://localhost:8081/OnloadCategory")
      .then(data => {
        this.setState({ categoryArray: data.data[0].category });
      })
      .catch(err => console.log(err));
  };

  handleCategoryChange = e => {
    this.setState({
      category: e.target.value
    });
  };

  handleCategory = e => {
    e.preventDefault();
    const user = { category: this.state.category };
    axios
      .post("http://localhost:8081/category", user)
      .then(data => {
        console.log("category IN ARRAY", data.data[0].category);
        this.setState({ categoryArray: data.data[0].category, category: "" });
      })
      .catch(err => console.log(err));
  };

  createCategory = () => {
    const res = this.state.categoryArray;
    const result = res.map(res => {
      return (
        <div>
          <li>
            <a onClick={this.buttoncategory} name={res}>
              <span className="list_icon">
                <img
                  style={{ width: "40px" }}
                  src="images/animal.png"
                  alt="up"
                />
              </span>{" "}
              {res}
            </a>
          </li>
        </div>
      );
    });
    return result;
  };

  createPost = () => {
    const res = this.state.postArray;

    if (this.state.buttonCategory === "All") {
      const result = res.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return result;
    } else if (this.state.buttonCategory === "latest") {
      var sorted = res.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
      console.log("sorted", sorted);

      const results = sorted.map(sorted => {
        return (
          <div>
            <Onload res={sorted} />
          </div>
        );
      });

      return results;
    } else if (this.state.buttonCategory === "oldest") {
      var sorted = res
        .sort((a, b) => {
          return new Date(a).getTime() - new Date(b).getTime();
        })
        .reverse();

      const result1 = sorted.map(sorted => {
        return (
          <div>
            <Onload res={sorted} />
          </div>
        );
      });
      console.log("sorted", sorted);

      return result1;
    } else if (this.state.buttonCategory === "click") {
      console.log("clicked");
      var sorted = res.sort((a, b) => {
        console.log(a.like.length);
        return b.like.length - a.like.length;
      });
      console.log("sorted", sorted);

      const results = sorted.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return results;
    } else if (this.state.buttonCategory === "comment") {
      console.log("clicked");
      var sorted = res.sort((a, b) => {
        console.log(a.comment.length);
        return b.comment.length - a.comment.length;
      });
      console.log("sorted", sorted);

      const results = sorted.map(res => {
        return (
          <div>
            <Onload res={res} />
          </div>
        );
      });

      return results;
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
        <div className="container" style={{ width: "1171px" }}>
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
                <a>
                  Add Categories
                  <input
                    onChange={this.handleCategoryChange}
                    type="text"
                    name="category"
                    value={this.state.category}
                  />
                  <button onClick={this.handleCategory} type="submit">
                    Category
                  </button>
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
                    {this.createCategory()}
                    <li>
                      <a onClick={this.buttoncategory} name="All">
                        <span className="list_icon">
                          <img src="images/icon_05.png" alt="up" />
                        </span>{" "}
                        All
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
                    <div className="btm_rgt">
                      <div className="btm_arc">Cats</div>
                    </div>
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
              <div className="contnt_1" style={{ marginBlockEnd: "30px  " }}>
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
                <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <li>
                        <a onClick={this.buttoncategory} name="latest">
                          <span className="list_img">
                            <img src="images/img_1.png" />
                          </span>
                          Latest First
                        </a>
                      </li>
                      <li>
                        <a onClick={this.buttoncategory} name="oldest">
                          <span className="list_img">
                            <img src="images/img_2.png" />
                          </span>
                          Oldest First
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="list_img">
                            <img src="images/img_3.png" />
                          </span>
                          Most Pet
                        </a>
                      </li>
                      <li>
                        <a onClick={this.buttoncategory} name="click">
                          <span className="list_img">
                            <img src="images/img_4.png" />
                          </span>
                          Most Clicks
                        </a>
                      </li>
                      <li>
                        <a onClick={this.buttoncategory} name="comment">
                          <span className="list_img">
                            <img src="images/img_5.png" />
                          </span>
                          Most Commented
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="post_txt">New Post Updates</div>
                </div>
              </div>
              <div className={this.state.click ? "contnt_2 div_a" : null}>
                {this.state.click ? (
                  <Post
                    click={this.handleUploadClick}
                    check={this.handleUploadCheck}
                  />
                ) : null}{" "}
              </div>
              <div className={this.state.check ? "contnt_2 div_a" : null}>
                {this.state.check ? <Upload data={this.state.data} /> : null}{" "}
              </div>
              <div>
                {" "}
                <div>
                  <Scroller
                    className="scroller"
                    style={{ height: "250vh", border: "1px solid black" }}
                    pageParam="page"
                    fixed
                    fetchData={page => {
                      return fetch(`${URL}?page=${page}`);
                    }}
                    dataSelector={res => res}
                    metaSelector={res => res.meta || { totalPages: 1 }}
                    loader={<div className="loader" />}
                  >
                    {(data, meta) => (
                      <div
                        style={
                          meta.totalPages > 1 ? { minHeight: "100vh" } : {}
                        }
                      >
                        {this.createPost()}
                      </div>
                    )}
                  </Scroller>
                </div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
      </div>
    );
  }
}
export default Explore;
