import React, { Component } from 'react';
import { withAuthorization } from '../Session';

class Admin extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      user : {
        name: 'John Doe',
        age: '21',
        bloodGroup: 'O+ve'
      }
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log(this.props);
    this.props.firebase.hospitals().on('value', snap => {
      const usersObj = snap.val();
      console.log(usersObj)
      const usersList = Object.keys(usersObj).map(key => ({ 
        ...usersObj[key], 
        uid: key
      }));
      console.log(usersList)
      this.setState({
        users: usersList,
        loading: false
      });
    });
    this.props.firebase.hospitals().on('value', snap => {
      const hospitalObj = snap.val();
      console.log(hospitalObj)
      let hosp = hospitalObj
      this.setState({
        hospital: hosp,
        loading: false
      });
    });
  }

  componentWillUnmount() { 
    this.props.firebase.emergencies().off(); 
  }
  
  render() {
    return (
      <div className="container">
        <h2>Welcome Admin of {}</h2>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Admin);