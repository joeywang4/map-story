import React, { Component } from 'react';

const genTimeString = (time) => {
    return time.getFullYear() + " "
         + (time.getMonth()+1) + "/"
         + time.getDate() + " "
         + adjustHour(time.getUTCHours()) + ":"
         + adjustMinute(time.getUTCMinutes())
}

const adjustHour = utcHour => {
    if(utcHour < 2){
        return "0"+(utcHour+8).toString();
    }
    else if(utcHour > 15){
        return "0"+(utcHour-16).toString();
    }
    else return (utcHour+8).toString();
}

const adjustMinute = min => min < 10 ? "0"+min.toString() : min.toString();

/*
Props
icon: user profile icon
onclick: post click callback
uid: user id
user: user name
time: post time
alt: text instead of time
content: post content
*/

export default class Post extends Component {
    handleClick = () => this.props.onClick(this.props.storyid);

    render() {
        
        let postTime = new Date(this.props.time*1000);

        return (
            <div className="post" onClick={this.handleClick}>
                <div className="post-header">
                    <img src={this.props.icon} alt={this.props.user} className="post-profile-icon" />
                    <div className="post-name-time">
                        <span href={"/"+this.props.uid}>{this.props.user}</span>
                        <small>{(this.props.time?genTimeString(postTime):"")+(this.props.alt?this.props.alt:"")}</small>
                    </div>
                </div>
                <div className="post-content">
                    {this.props.content}
                </div>
            </div>
        )
    }
}