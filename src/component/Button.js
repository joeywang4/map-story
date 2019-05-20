import React, { Component } from 'react';
import "../css/Button.css";


export default class Button extends Component {
    render() {
        let icon = null;
        if(this.props.icon === "house"){
            icon = require("../img/buttonIcon/house.png");
        }
        else if(this.props.icon === "pencil"){
            icon = require("../img/buttonIcon/edit.png");
        }
        if(icon){
            icon = <img src={icon} alt={this.props.icon} className="button-icon" />;
        }
        
        return (
            <button className="control-button" id={this.props.id} onClick={this.props.callback} >
                {icon}
            </button>
        )
    }
}