import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import ResponseButton from '../ResponseButton'

class UsersEmergency extends Component {
  
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      loading: false,
      users: [],
      helpers: {},
      hospital: '',
      hospitalID: ''
    }
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.emergencies().on('value', snap => {
      const usersObj = snap.val();
      const usersList = Object.keys(usersObj).map(key => ({ 
        ...usersObj[key], 
        uid: key
      }));
      console.log("Users List: ", usersList)
      this.setState({
        users: usersList,
        loading: false
      });
    });

    this.props.firebase.hospitals().on('value', snap => {
      const hospitalObj = snap.val();
      let hosp = hospitalObj[this.state.hospitalID]
      this.setState({
        hospital: hosp
      });
    });

    this.props.firebase.helpers().on('value', snap => {
      const helperObj = snap.val();
      let helper = helperObj
      this.setState({
        helpers: helper
      });
    });
  }

  componentWillUnmount() { 
    this.props.firebase.emergencies().off(); 
  }
  
  render() {
    return (
      <div className="container-fluid text-center centered">
        <div className="jumbotron">
          <h1>Emergencies</h1>
          <span>{this.state.loading && <div>Loading emergency cases...</div>}</span>
        </div>
        <table className="table"> 
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Problem</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Blood Group</th>
              <th scope="col">Past Problems</th>
              <th scope="col">Contact No</th>
              <th scope="col">Latitude</th>
              <th scope="col">Longitude</th>
              <th scope="col">Emergency Contact No</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <UserListDisplay users={this.state.users}/>
        </table>
        <h4>Help Others Emergency</h4>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Emergency Type</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th scope="col">Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.helpers.name}</td>
              <td>{this.state.helpers.problem}</td>
              <td>{this.state.helpers.contact}</td>
              <td>{this.state.helpers.address}</td>
              <td><ResponseButton /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

const UserListDisplay = ({ users }) => (
  <tbody>
    {users.map(user => (
      user.emer ? ( 
      <tr key={user.uid}>
        <td>{user.name}</td>
        <td>{user.problem}</td>
        <td>{user.age}</td>
        <td>{user.gender}</td>
        <td>{user.blood}</td>
        <td>{user.pastp}</td>
        <td>{user.contact}</td>
        <td>{user.latitude}</td>
        <td>{user.longitude}</td>
        <td>{user.econtact}</td>
        <td>
          <ResponseButton user={user}/>
        </td>
      </tr> ) : null
    ))}
  </tbody>
);

export default withFirebase(UsersEmergency);