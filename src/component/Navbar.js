import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import "../css/Navbar.css"

const buttons = (
    <ul className="nav navbar-nav">
        <li className="navbar-item">
            <Link to="/login">Login</Link>
        </li>  
        <li className="navbar-item">
            <Link to="/register">Register</Link>
        </li>  
    </ul>
);

class Navbar extends Component {
    welcomMsg = name => {
        return (
            <React.Fragment>
                <ul className="nav navbar-nav">
                    <li className="navbar-item">
                        <span className="navbar-words">Hello, <i>{name}</i></span>
                    </li>
                    <li className="navbar-item">
                        <a href="/auth/logout">Logout</a>
                    </li>  
                </ul>
            </React.Fragment>
        )
    }

    render() {
        return ( 
            <nav className = "navbar-default" >
                <div className="navbar-header">
                    <Link to="/">Map Story</Link>
                </div>
                <div className="navbar-collapse" id="bs-example-navbar-collapse-1">
                    {this.props.user!==null?this.welcomMsg(this.props.user):buttons}
                </div>
            </nav>
        );
    }
}

export default Navbar;