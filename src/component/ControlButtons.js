import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../component/Button';
import "../css/ControlButtons.css";

export default class ControlButton extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to='/'>
                    <Button icon="house" id="home" callback={this.props.home} />
                </Link>
                <Link to='/edit'>
                    <Button icon="pencil" id="edit" callback={this.props.edit}/>
                </Link>
            </React.Fragment>
        )
    }
}