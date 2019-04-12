import React, { Component } from 'react';
import { Link , withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import '../css/app.css';
// import MapContainer from '../Maps'; 
import Geocode from 'react-geocode';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  address: '',
  state: '',
  location: '',
  latitude: '',
  longitude: '',
  specialization: '',
  ambulances: '',
  bloodUnits: '',
  error: null,
};

const API_KEY = "AIzaSyARA20EMX48AMmy62UDRQkSwmfzj-XQL1E"

Geocode.setApiKey(API_KEY);

const SignUpPage = () => (
  <div>
    <h1 className="text-center mt-4 mb-4">Register Hospital</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      ...INITIAL_STATE  
    };
  }

  getLatitudeAndLongitude = (location) => {
    let obj = location
    let loc = obj.location
    Geocode.fromAddress(loc).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng)
        this.setState({
          latitude: lat,
          longitude: lng
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit = event => {
    const { email, passwordOne, hospitalname, address, state, latitude, longitude, location, specialization, ambulances, bloodUnits } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => { 
        return this.props.firebase
          .hospital(authUser.user.uid)
          .set({
            hospitalname,
            email,
            address,
            state,
            location,
            latitude,
            longitude,
            specialization,
            ambulances,
            bloodUnits
          });
      })
      .then(() => {
        this.setState({ 
          ...INITIAL_STATE 
        });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ 
          error 
        });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const {
      hospitalname,
      email,
      passwordOne,
      passwordTwo,
      address,
      state,
      location,
      error,
      latitude,
      longitude,
      specialization,
      ambulances,
      bloodUnits
    } = this.state;

    /*
      Form check validation
      Allows the button to render/send data only when all the conditions are met
    */

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || hospitalname === '' || address === '' || state === 'Select State';

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              name="hospitalname"
              value={hospitalname}
              onChange={this.onChange}
              type="text"
              placeholder="Name of the Hospital"
            />
            <small id="emailHelp" className="form-text text-muted">Enter the complete name of the hospital</small>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="location"
              type="text"
              value={this.state.location}
              onChange={this.onChange}
              placeholder="Location of the Hospital"
            />
            <small id="emailHelp" className="form-text text-muted">Enter keywords for the location of the hospital. Eg. Apollo Hospital, Mathura Road and then check latitude and longitude below</small>
          </div>
          <div className="form-group">
            <div
              className="btn btn-outline-primary centered mb-4 buttonLink"
              onClick={() => { this.getLatitudeAndLongitude({location}) }}  
            >
              Search
            </div>
          </div>
          <div className="form-group">
            <input
              disabled
              className="form-control half-width"
              name="latitude"
              value={latitude}
              type="text"
              placeholder="Latitude"
            />
          </div>
          <div className="form-group">
            <input
              disabled
              className="form-control half-width mb-4"
              name="longitude"
              value={longitude}   
              type="text"
              placeholder="Longitude"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Official email of the hospital"
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="address"
              value={address}
              onChange={this.onChange}
              type="text"
              placeholder="Complete address of the hospital"
            ></textarea>
          </div>
          <div className="form-group">
          <select 
            className="form-control"
            name="state"
            value={state}
            onChange={this.onChange}
            type="text"
          >
            <option value="">Select State</option>
            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Orissa">Orissa</option>
            <option value="Pondicherry">Pondicherry</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttaranchal">Uttaranchal</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="West Bengal">West Bengal</option>
          </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="specialization"
              value={specialization}
              onChange={this.onChange}
              type="text"
              placeholder="Specialization"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bloodUnits">Is blood bank available?</label>
            <select
              className="form-control"
              name="bloodUnits"
              value={bloodUnits}
              onChange={this.onChange}
              type="text"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ambulances">Is ambulance service available?</label>
            <select
              className="form-control"
              name="ambulances"
              value={ambulances}
              onChange={this.onChange}
              type="text"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>
          {/* <div className="form-group">
            <input
              className="form-control"
              name="doctors"
              value={doctors}
              onChange={this.onChange}
              type="text"
              placeholder="Doctors"
            />
          </div> */}
          <div className="form-group">
            <input
              className="form-control"
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button 
            disabled={isInvalid} 
            className="btn btn-primary centered" 
            type="submit"
          >
            Sign Up
          </button>
          {error && <p>{error.message}</p>}
        </form>
        {/* <div className="container-fluid">
          <MapContainer />
        </div> */}
      </div>
    );
  }
}

const SignUpLink = () => (
  <p className="text-center mt-4 mb-4">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };