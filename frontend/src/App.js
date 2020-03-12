import React from "react";
import Register from "./register";
import Login from "./login";
import Timeline from "./timeline";
import Explore from "./explore";
import Header from "./header";
import Footer from "./footer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Forgot from "./forgot";
import Reset from "./reset";
import SinglePost from "./singlePost";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      check: false,
      email: ""
    };
  }
  handleClick = e => {
    this.setState({
      check: e
    });
  };
  handleUser = e => {
    console.log("app m email", e);
    this.setState({
      email: e
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Header checkprop={this.state.check} />
          <Switch>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  handleClicks={this.handleClick}
                  handleUsers={this.handleUser}
                />
              )}
            />
            <Route
              path="/forgot"
              render={props => (
                <Forgot {...props} handleUsers={this.handleUser} />
              )}
            />
            <Route
              path="/reset"
              render={props => (
                <Reset {...props} checkEmail={this.state.email} />
              )}
            />
            <Route
              path="/explore"
              render={props => (
                <Explore
                  {...props}
                  handleClicks={this.handleClick}
                  checkEmail={this.state.email}
                />
              )}
            />
            <Route
              path="/timeline"
              render={props => (
                <Timeline
                  {...props}
                  handleClicks={this.handleClick}
                  checkEmail={this.state.email}
                />
              )}
            />
            <Route
              path="/singlePost"
              render={props => (
                <SinglePost {...props} handleClicks={this.handleClick} />
              )}
            />
            <Route path="/" render={props => <Register {...props} />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
