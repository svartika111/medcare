import React from 'react'
import { AuthUserContext, withAuthorization } from '../Session'
import FetchDataHospitals from '../FetchDataHospitals'

const Account = () => (
  
  <AuthUserContext.Consumer>
    { authUser => authUser ? <FetchDataHospitals id={authUser.uid} /> : <h3>Data not available</h3> }
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Account)
