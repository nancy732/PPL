import React from 'react'
import axios from 'axios'
class Reset extends React.Component{
  constructor(props){
    super(props)
    this.state={
      psw:'',
      repeat:'',
      result:''
    }

    console.log('email in reset',this.props.checkEmail)
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    console.log("reset email called")
   
    const user={email:this.props.checkEmail,
    psw:this.state.psw,
     repeat:this.state.repeat}
    
    axios.post('http://localhost:8081/reset',user)
    .then((data)=>{
        this.setState({
          result:data.data
        })
      })
      .catch(err=>console.log(err));        

  }
    render() {
      return (
        <div>
          <meta charSet="utf-8" />
          <title>Reset Password</title>
          <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
          <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
          <div className="container">
            <div className="content">
              <div className="content_rgt">
                <div className="register_sec">
                  <h1>Reset Password</h1>
                  <div name="result" className="response">{this.state.result}</div>

                  <form onSubmit={this.handleSubmit}>
                  <ul>
                    <li><span>Enter New Password</span><input onChange={this.handleChange} pattern="[a-z0-9].{6,}" type="text" placeholder="Enter your new password" name="psw" required/></li>
                    <li><span>Confirm Password</span><input onChange={this.handleChange} type="text" placeholder="Enter your password again" name="repeat" required/></li>
                    <li><input type="submit" defaultValue="Submit"/></li>
                  </ul>
                  </form>
                </div>
              </div>
              <div className="content_lft">
                <h1>Welcome from PPL!</h1>
                <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
                <img src="images/img_9.png" alt="" /> </div>
            </div>
          </div>
          
        </div>
      );
    }
  };
  export default Reset