import React, { Component } from 'react'
import { withFirebase } from '../Firebase'

class ResponseButton extends Component {
  constructor(props) {
    super(props);

    console.log("Response Button Props", this.props)

    this.state = {
      user: {}
    }
  }
  
  componentDidMount() {
    this.setState({
      user : this.props.user
    })
  }

  resetBits = () => {
    this.props.firebase.emergencies().child(this.props.user.uid)
    .update({
      emer: 0,
      respond: 1
    });
    this.props.firebase.emergencies().child(this.props.user.uid)
    .update({
      hospitalRef: 'Apollo Hospital, Mathura Road'
    });
    this.props.firebase.emergencies().child(this.props.user.uid)
    .update({
      respond: 0
    });
    console.log(this.props)
  }

  render(){
    return(
      <div>
        <button 
          className="btn btn-primary"
          onClick={() => {this.resetBits()}}
        >
          Respond
        </button>
      </div>
    )
  }
}

export default withFirebase(ResponseButton)