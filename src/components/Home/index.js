import React from 'react';
import UsersEmergency from '../UsersEmergency'
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <UsersEmergency />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);