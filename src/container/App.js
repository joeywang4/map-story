import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import MapView from "./MapView.js";
import Story from "./Story";
import Write from './Write.js';
import Login from './Login.js';
import ControlButtons from "../component/ControlButtons";
import Navbar from "../component/Navbar";
import "../css/App.css";

const socket = io();

const getLocation = (options) => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      } else {
        reject("Browser doesn't support Geolocation");
      }
    });
}

const [ALL, USER] = [0, 1];

export default class App extends Component {
    constructor(props) {
        super(props);
        this.map = React.createRef();
        this.state = {
            stories: null,
            uid: null,
            user: null,
            icon: null,
            home: [25.319, 121.542],
            filter: ALL,
            alt: "Loading..."
        }

        fetch("/api/post")
        .then(res => res.json())
        .then(data => {
            this.allStories = data;
            this.setState({stories: data});
        })
        .catch(err => console.error(err));

        getLocation()
        .then(loc => {
          console.log("Got location", loc.coords);
          this.setState({home: [loc.coords.latitude, loc.coords.longitude]});
        })
        .catch(err => console.error(err));

        fetch("/api/user")
        .then(res => res.json())
        .then(data => {
            this.setState({uid: data['_id'], user: data['user'], icon: data['icon']});
        })
        .catch(err => console.error(err));

        if(socket !== undefined) console.log("Connected to sockets!");
        socket.on('update', this.updateStory)
    }

    goHome = (e) => {this.map.current.goHome();}

    handleStoryClick = (storyid) => this.map.current.goToMarker(storyid);
    handleFilterClick = (e) => {
        if(e.target.id === "posts"){
            this.setState(state => {
                state.stories = this.allStories;
                state.filter = ALL;
                return state;
            })
        }
        else if(e.target.id === "userPosts"){
            if(this.state.uid === null){
                this.setState(state => {
                    state.stories = null;
                    state.alt = "Please Login First!";
                    state.filter = USER;
                    return state;
                })
            }
            else this.setState(state => {
                state.stories = this.allStories.filter(story => story.author._id === this.state.uid);
                state.filter = USER;
                return state;
            })
        }
    }

    updateStory = newStory => {
        console.log("Receive new story", newStory);
        this.allStories.unshift(newStory);
        if(this.state.view === ALL) {
            this.setState(state => {
                state.stories = this.allStories;
                return state;
            })
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Navbar user={this.state.user}/>
                <div className="App">
                    <MapView home={this.state.home} stories={this.state.stories} ref={this.map}/>
                    <Switch>
                        <Route 
                            exact path="/" 
                            render={() => 
                            <Story 
                                home={this.state.home} 
                                stories={this.state.stories} 
                                onStoryClick={this.handleStoryClick} 
                                onFilterClick={this.handleFilterClick} 
                                alt={this.state.alt} 
                            />}
                        />
                        <Route 
                            exact path="/edit" 
                            render={() => <Write uid={this.state.uid} icon={this.state.icon} user={this.state.user} home={this.state.home} />} 
                        />
                        <Route 
                            path="/login/:msg?"
                            render={({match}) => <Login view="login" msg={match.params.msg} />}
                        />
                        <Route 
                            path="/register/:msg?"
                            render={({match}) => <Login view="register" msg={match.params.msg} />}
                        />
                    </Switch>
                    <ControlButtons home={this.goHome} edit={null}/>
                </div>
            </BrowserRouter>
        )
    }
}