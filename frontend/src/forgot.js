import React from 'react'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
class Forgot extends React.Component {
    constructor(props) {
        super(props)
        this.state =
        {
            email: "",
            click: false
        }
    }

    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            result: ''
        })
        console.log(e.target.value)
    }
    submit = (e) => {
        e.preventDefault();

        const user = this.state;
        console.log(user);

        axios.post('http://localhost:8081/forgot', user)
            .then((data) => {
                this.props.handleUsers(user.email);
                this.setState({
                    result: data.data
                })
                if (data.data == "change password") {
                    this.setState({
                        click:true
                    })
                }
            })

            .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <meta charSet="utf-8" />
                <title>Forgot Password</title>
                <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
                <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />

                <div className="container">
                    <div className="content">
                        <div className="content_rgt">
                            <div className="register_sec">
                                <h1>Forgot Password</h1>
                                <form className="modal-content" onSubmit={this.submit}>
                                    <div name="result" className="response">{this.state.result}</div>

                                    <ul>
                                        <li><span>Enter E-mail ID</span><input type="text" onChange={this.changeState} name="email" placeholder="User@gmail.com" required/></li>
                                        <li><input type="submit" defaultValue="Submit" />
                                        { this.state.click ? <Redirect to="/reset"></Redirect> : null}
                                        </li>
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
export default Forgot