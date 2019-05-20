import React, { Component } from 'react';
import Post from '../component/Post';
import "../css/Story.css";

/*
* Props
* uid: user id
*/

export default class Write extends Component {
    render() {
        return (
            <div className="Story">
                <div className="write-container">
                    {this.props.uid!==null
                    ?
                    <Post 
                        icon={this.props.icon}
                        uid={this.props.uid}
                        user={this.props.user}
                        time={null}
                        alt={"New Post"}
                        content={
                            <form id="write-form" action="/api/post" method="POST">
                                <textarea
                                    id="write-input"
                                    form="write-form"
                                    name="story"
                                    rows="10"
                                    placeholder="Write something about your new story..."
                                />
                                <br />
                                <input type="hidden" name="latlng" value={this.props.home} />
                                <input type="submit" value="Send" />
                            </form>
                        }
                        storyid={0}
                        key={0}
                        onClick={() => {}}
                    />
                    :
                    <div className="post-alt-text">
                        <span>Please Login First!</span>
                    </div>
                    }
                    
                </div>
            </div>
        )
    }
}