import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './styles.css'
class Register extends React.Component{
  constructor(props)
  {
    super(props);
    var show = localStorage.getItem('checkLogin')
    
    if(show=='true')
    {
      props.history.push('/explore')
    }
    this.state = {
      Username:"",
      email:"",
      psw:"",
      repeat:"",
      PhoneNumber:"",
      active:false,
      active1:false,
      class:'buttonTrue'
    }
  }

  changeState=(e)=>
    {
        this.setState({
            [e.target.name]:e.target.value,
            result:''
        })
        console.log(e.target.value)
    }

  submit= (e)=>
    {
        e.preventDefault();

        const user = this.state;
        console.log(user);
        
        axios.post('http://localhost:8081/user',user)
        .then((data)=>{
            this.setState({
                result:data.data,
                class:'buttonFalse'
            })
            if(data.data == "enter valid Password"){
                this.setState({
                    active1:true
                })
            }
            else if(data.data == "email already exist"){
                this.setState({
                    active:true
                })
            }
            else if(data.data == "successful")
            {
              this.props.history.push('/explore')  
            }
        }).catch(err=>console.log(err)); 
      }


    render() {
      return (
        <div>
          
          <meta charSet="utf-8" />
          <title>Create An Account</title>
          
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="register_sec"> 
                <form className="modal-content" onSubmit={this.submit} >

                  <h1>Create An Account</h1>
                  <div name="result" className="response">{this.state.result}</div>

                  <ul>
                    <li><span>Username</span><input type="text" style={{color:"black"}} name="Username" onChange={this.changeState} placeholder="Enter your username" required /></li>
                    <li><span>Email</span><input type="email" style={{color:"black"}} name="email" className={this.state.active ? "buttonTrue": "buttonFalse"} onChange={this.changeState} placeholder="Enter your email" required/></li>
                    <li><span>Password</span><input type="password" style={{color:"black"}} pattern="[a-z0-9].{6,}" name="psw" className={this.state.active1 ? "buttonTrue": "buttonFalse"} onChange={this.changeState} placeholder="Enter your password" required/></li>
                    <li><span>Confirm Password</span><input style={{color:"black"}} type="password" name="repeat" pattern="[a-z0-9].{6,}" className={this.state.active1 ? "buttonTrue": "buttonFalse"} onChange={this.changeState} placeholder="Confirm your Password" required/></li>
                    <li><span>PhoneNumber</span><input type="text" style={{color:"black"}} pattern="[0-9]{10}" name="PhoneNumber" onChange={this.changeState} placeholder="Enter your Phone Number" required/></li>
                    <li><input type="checkbox" />I agree to Term &amp; Conditions</li>
                    <li><input type="submit" /></li>
                  </ul>
                  </form>
                  <div className="addtnal_acnt">I already have an account.<Link to="/login">Login My Account !</Link></div>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                <img src="images/img_9.png" alt="" /> </div>
            </div>
          </div>
          <div className="clear" />
          
        </div>
      );
    }
  }

  export default Register