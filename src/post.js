import React from "react";
import axios from "axios";

class Post extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      PostName: "",
      category: "Select Category",
      categoryArray: [],
      email: localStorage.getItem("email"),
      file: ""
    };
  }
  componentDidMount(props) {
    console.log("posts", localStorage.getItem("email"));

    axios
      .get("http://localhost:8081/OnloadCategory")
      .then(data => {
        console.log("onload category!!!!!!!!!!!!!!!", data.data[0].category);
        this.setState({ categoryArray: data.data[0].category });
      })
      .catch(err => console.log(err));
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpload = e => {
    this.setState({ file: e.target.files[0] });
  };

  handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", this.state.file);
    formData.append("email", this.state.email);
    formData.append("PostName", this.state.PostName);
    formData.append("category", this.state.category);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:8081/upload", formData, config)
      .then(data => {
        this.props.click(false);
        console.log("post", data.data);
        this.props.check(true, data.data);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>UPLOAD YOUR POST</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="post_txt"
            type="text"
            onChange={this.handleChange}
            placeholder="Name your post"
            name="PostName"
            required
          ></input>
          <select
            className="post_txt"
            onChange={this.handleSelect}
            name="category"
            required
          >
            <option>Select Category</option>
            <option value="Cats">Cats</option>
            <option value="Dogs">Dogs</option>
            <option value="Birds">Birds</option>
            <option value="Rabbit">Rabbit</option>
            <option value="Others">Others</option>
            {this.state.categoryArray.map(data => {
              return <option value={data}>{data}</option>;
            })}
          </select>
          <div>
            <input
              onChange={this.handleUpload}
              style={{
                marginLeft: "250px",
                paddingTop: "20px",
                paddingBottom: "10px"
              }}
              type="file"
              name="avatar"
              required
            />
          </div>
          <div>
            <button style={{ marginLeft: "300px" }} type="submit">
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Post;
