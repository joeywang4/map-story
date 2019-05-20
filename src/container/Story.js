import React, { Component } from 'react';
import Post from '../component/Post';
import "../css/Story.css";

export default class Story extends Component {
    constructor(props) {
        super(props);
        if(this.props.stories) this.genStories(this.props.stories);
    }

    genStories = () => {
        return this.props.stories.map(story => {
            return (
            <Post icon={story.author.icon}
                  uid={story.author._id}
                  user={story.author.user}
                  time={story.time}
                  content={story.content}
                  storyid={story._id}
                  key={story._id}
                  onClick={this.props.onStoryClick}
            />
            )
        })
    }

    render() {
        return (
            <div className="Story">
                <div className="filterBar">
                    <input type="radio" className="filter-radio" name="filter" id="posts" onClick={this.props.onFilterClick} defaultChecked/>
                    <label className="filter" htmlFor="posts">Posts</label>
                    <input type="radio" className="filter-radio" name="filter" id="userPosts" onClick={this.props.onFilterClick} />
                    <label className="filter" htmlFor="userPosts">Your Posts</label>
                </div>
                <div className="post-container">
                    {this.props.stories?this.genStories():<div className="post-alt-text"><span>{this.props.alt}</span></div>}
                </div>
            </div>
        );
    }
}