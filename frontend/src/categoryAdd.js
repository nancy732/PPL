import React from "react";
import axios from "axios";

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      category: "",
      categoryArray: [],
      file: ""
    };
  }

  handleChange = e => {
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
      .post("http://localhost:8081/category", formData, config)
      .then(data => {
        console.log("category IN ARRAY", data.data[0].category);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Add New Category</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="post_txt"
            type="text"
            onChange={this.handleChange}
            placeholder="Add new Category"
            name="category"
            required
          ></input>
          <div>
            <input
              onChange={this.handleUpload}
              type="file"
              name="avatar"
              required
            />
          </div>
          <div>
            <button type="submit">UPLOAD</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CategoryAdd;
