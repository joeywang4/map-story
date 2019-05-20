import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import "../css/MapView.css";
import {strToIcon, getIcon} from "../component/Icon";

const createMarkers = (stories) => {
  return stories.map(story => 
    <Marker position={story.latlng} icon={strToIcon(story.author.user)} key={story._id}>
      <Popup>
        {story.content}
      </Popup>
    </Marker>
  );
}

export default class MapView extends Component {
  constructor (props) {
    super(props);
    this.idCounter = 1;
  }

  /*****************
   * Event Handler *
   *****************/

  handleClickOnMap = (e) => {
    this.changeLocation(e.latlng);
  }

  handleClickOnMarker = (e) => {
    let _id = e.target.getAttribute("markerid");
    for(let i = 0;i < this.state.markers.length; i++){
      if(this.state.markers[i].id.toString() === _id){
        this.changeLocation(this.state.markers[i].latlng);
        this.setState(state => {
          state.markers.splice(i, 1);
          return state;
        });
        break;
      }
    }
  }

  handleViewportChange = (viewport) => {
    //const map = this.refs.map.leafletElement;
    //console.log(map.getBounds());
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({home: nextProps.home});
  }

  /********************
   * Map Manipulation *
   ********************/

  changeLocation = (latlng) => {
    const map = this.refs.map.leafletElement;
    map.panTo(latlng);
  }

  changeZoom = (zoom) => {
    const map = this.refs.map.leafletElement;
    map.setZoom(zoom);
  }
  
  /****************
   * API Function *
   ****************/

  goHome = () => {    
    const map = this.refs.map.leafletElement;
    map.setView(this.props.home, 17);
  }

  goToMarker = storyId => {
    for(let i = 0;i < this.props.stories.length; i++){
      if(this.props.stories[i]._id === storyId){
        this.changeLocation(this.props.stories[i].latlng);
        break;
      }
    }
  }
 
  /**********
   * render *
   **********/

  render() {
    return (
      <Map center={this.props.home} zoom={17} maxZoom={19} zoomControl={false}
        onViewportChanged={this.handleViewportChange}
        onClick={this.handleClickOnMap} 
        id="mapid" ref='map'>
        <ZoomControl position="bottomleft" />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.stories?createMarkers(this.props.stories):null}
        <Marker position={this.props.home} icon={getIcon(1)}>
            <Popup>Here you are</Popup>
        </Marker>
      </Map>
    );
  }
}