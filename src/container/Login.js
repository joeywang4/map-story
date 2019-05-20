import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "../css/Login.css";

export default class Login extends Component {
    loginWindow = (
        <div className="window">
            <div className="Title">Login</div>
            <form id="login-form" action="/auth/login" method="POST">
                <input type="text" name="email" placeholder="Email" required={true} /><br />
                <input type="password" name="pwd" placeholder="Password" required={true} /><br />
            </form>
            {this.props.msg?<span className="err-msg">* {this.props.msg}</span>:""}
            <input className="send-btn" type="submit" form="login-form" value="Login" />
        </div>
    )

    registerWindow = (
        <div className="window">
            <div className="Title">Register</div>
            <form id="register-form" action="/auth/register" method="POST">
                <input type="text" name="email" placeholder="Email" required={true} /><br />
                <input type="password" name="pwd" placeholder="Password" required={true} /><br />
                <input id="username" type="text" name="user" placeholder="Username" required={true} /><br />
                <input type="text" name="icon" placeholder="Icon URL" /><br />
            </form>
            {this.props.msg?<span className="err-msg">* {this.props.msg}</span>:""}
            <input className="send-btn" type="submit" form="register-form" value="Register" />
        </div>
    )

    render() {
        return (
            <div className="Login">
                <div className="filterBar">
                    <Link className="switch-link" to="/login"><input type="radio" className="switch-radio" name="filter" id="login" checked={this.props.view==='login'} readOnly={true} />
                    <label className="switch" htmlFor="login">Login</label></Link>
                    <Link className="switch-link" to="/register"><input type="radio" className="switch-radio" name="filter" id="register" checked={this.props.view==='register'} readOnly={true} />
                    <label className="switch" htmlFor="register">Register</label></Link>
                </div>
                <div className="window-container">
                    {this.props.view==='login'?this.loginWindow:this.registerWindow}
                </div>
            </div>
        );
    }
}