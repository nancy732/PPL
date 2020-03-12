import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


class Header extends React.Component{
  
  constructor(props)
  {
    super(props)
    this.state={
      click:false,
      clickme:false,
      logout:false
    }
  }
  clickMe=(e)=>
  {
    this.setState({
      click:true,
      clickme:false
    })
  }
  exploreClick=(e)=>{
    this.setState({
      clickme:true,
      click:false
    })
  }
  handleLogout=(e)=>{
    this.setState({logout : window.confirm('Are You Sure ???')})
    localStorage.setItem('checkLogin',false)
  }

      render(){
        return(
            <div>
            <div className="navbar navbar-inverse navbar-fixed-top">
            <div className="navbar-inner">
              <div className="container">
                <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
                <a className="brand" >PPL</a>
                <div className="pro_info pull-right">
                  <div className="pro_icn"><img src="/images/pic_small.png" /></div>
                  <div className="pro_txt">Me<b className="caret" /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="header">
            <div className="header_lft">
              <div className="logo">
                <a>
                <img src="/images/logo.png" />
                  </a></div>
              <div className="navigatn">
                <ul>
                  
                  {this.props.checkprop ? <li><a onClick={this.handleLogout}>Logout </a></li>:null}
                  {this.state.logout? <Redirect to="/login"></Redirect>:null}
                  {this.props.checkprop ? <li><a onClick={this.exploreClick}>Explore</a></li>  :null} 
                  {this.state.clickme ? <Redirect to="/explore"></Redirect> : null} 
                  
                </ul>
              </div>
            </div>
            <div className="header_rgt">
              <input type="text" placeholder="Search" className="txt_box" />
              <div className="msg_box"><a href="#"><span className="msg_count">0</span></a></div>
              <div className="info_div" >
                <div className="image_div"> <img src="/images/pic.png" /> </div>
                
                {this.props.checkprop ? <div onClick={this.clickMe} className="info_div1">Me</div> : null }
                {this.state.click ? <Redirect to="/timeline"></Redirect> : null}
                
              </div>
            </div>
          </div>
          </div>
        )
    }
}
export default Header