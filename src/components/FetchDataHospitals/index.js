import React, { Component } from 'react'
import MapContainer from '../Maps';
import { withFirebase } from '../Firebase'

class FetchDataHospitals extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      hospitalID: this.props.id,
      hospital: []
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.hospitals().on('value', snap => {
      const hospitalObj = snap.val();
      let hosp = hospitalObj[this.state.hospitalID]
      this.setState({
        hospital: hosp,
        loading: false
      });
    });
  }

  componentWillUnmount() { 
    this.props.firebase.emergencies().off(); 
  }

  outputToConsole = (param) => {
    console.log(param)
  }
  
  render() {
    return (
      <div className="container centered mb-4">
        <div className="jumbotron">
          <h1>Hospital Details</h1>
          <span>{this.state.loading && <div>Loading hospital details...</div>}</span>
        </div>
          <UserListDisplay hospital={this.state.hospital}/>
          {this.outputToConsole(this.state.hospital)}
          <MapContainer lat={this.state.hospital.latitude} lng={this.state.hospital.longitude} />  
      </div>
    )
  }
}

const UserListDisplay = ({ hospital }) => (
  <div className="container text-center">
      <h5><strong>NAME :</strong>{hospital.hospitalname}</h5>      
      <h5><strong>ADDRESS :</strong>{hospital.address}</h5>     
      <h5><strong>STATE :</strong>{hospital.state}</h5>    
      <h5><strong>EMAIL :</strong>{hospital.email}</h5>      
      <h5><strong>SPECIALIZATION :</strong>{hospital.specialization}</h5>      
      <h5><strong>AMBULANCES AVAILABLE:</strong>{hospital.ambulances}</h5>
      <h5><strong>LOCATION:</strong></h5>      
  </div>
);

export default withFirebase(FetchDataHospitals)