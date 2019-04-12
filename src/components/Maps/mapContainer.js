import React, { Component } from 'react';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = "AIzaSyARA20EMX48AMmy62UDRQkSwmfzj-XQL1E"

const MapStyle = {
  width: '100%',
  height: '500px'
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    console.log("Propped Value", this.props)
  
    this.state = {
      location : {
        lat : this.props.lat,
        lng : this.props.lng
      }
    }
    console.log(this.state.location)
  }
  
  render () {
    return (
      <div>
        <div className="container map-container">
          <Map
            google={this.props.google}
            zoom={16}
            style={MapStyle}
            initialCenter={{
              lat: this.state.location.lat,
              lng: this.state.location.lng
            }}>
              <Marker onClick={this.onMarkerClick} name={'Current Location'} />
            </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);