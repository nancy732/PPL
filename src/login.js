import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Cookies from 'js-cookie'
import './styles.css'


class Login extends React.Component {
  constructor(props) {
    super(props)
    
    var show = localStorage.getItem('checkLogin')
    
    console.log("show", typeof (show), show == false, show === "false", show == 'false')
    if(show=='true')
    {
      props.history.push('/explore')
    }
    
    console.log(this.props)
    this.state =
    {
      email: "",
      psw: "",
      active: false,
      active1: false,
      class: 'buttonTrue',
      rememberMe: false
    }
  }

  componentDidMount(props) {

    this.props.handleClicks(false);
    if(navigator.cookieEnabled)
    {
      console.log("cookies",navigator.cookieEnabled)
      this.setState({
        email: Cookies.get('email'),
        psw: Cookies.get('password')
      })
    }
    if (Cookies.get('email') !== '' && Cookies.get('password') !== '') {
      document.getElementById("remember").checked = true
    }
  }

  changeState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      result: ''
    })
    localStorage.setItem('email', this.state.email)

    console.log(e.target.value)
  }

  handleCheckClick = (e) => {

    if (e.target.checked && this.state.email !== '' && this.state.psw !== '') {
      Cookies.set('email',this.state.email)
      Cookies.set('password', this.state.psw)
    }
    else {
      Cookies.remove('email')
      Cookies.remove('password')
      this.setState({
        email: '',
        psw: ''
      })

    }
  }

  submit = (e) => {
    e.preventDefault();

    const user = this.state;
    console.log(user);

    axios.post('http://localhost:8081/users', user)
      .then((data) => {
        this.props.handleUsers(user.email);
        this.setState({
          result: data.data,
          class: 'buttonFalse',
          active: true
        })
        if (data.data == "verify your email") {
          localStorage.setItem('checkLogin',true)
          this.props.history.push('/explore')
        }
      })

      .catch(err => console.log(err));

  }

  render() {
    return (
      <div>
        <meta charSet="utf-8" />
        <title>Login Account</title>
        <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="login_sec">
                <form className="modal-content" onSubmit={this.submit} >
                  <h1>Log In</h1>

                  <div name="result" className="response">{this.state.result}</div>

                  <ul>
                    <li><span>Email</span><input style={{ color: "black" }} type="text" onChange={this.changeState} value={this.state.email} name="email" className={this.state.active ? "buttonTrue" : "buttonFalse"} placeholder="Enter your email" required /></li>
                    <li><span>Password</span><input style={{ color: "black" }} type="password" onChange={this.changeState} value={this.state.psw} name="psw" className={this.state.active1 ? "buttonTrue" : "buttonFalse"} placeholder="Enter your password" required /></li>
                    <li><input id="remember" name="rememberMe" type="checkbox" value={this.checked} onClick={this.handleCheckClick} />Remember Me

                    </li>
                    <div><input type="submit" defaultValue="Log In" />
                      <Link to="/forgot">Forgot Password</Link>
                    </div>
                  </ul>
                </form>
                <div className="addtnal_acnt">I do not have any account yet.<Link to="/">Create My Account Now !</Link></div>
              </div>
            </div>
            <div className="content_lft">
              <h1>Welcome from PPL!</h1>
              <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
              <img src="images/img_9.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login