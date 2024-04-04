import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { useSubscription } from '@apollo/client';
import ConnectionStatusButtonComponent from './component';
import { USER_CURRENT_STATUS_SUBSCRIPTION } from '../queries';
import Auth from '/imports/ui/services/auth';

const connectionStatusButtonContainer = (props) => {
  const { data } = useSubscription(USER_CURRENT_STATUS_SUBSCRIPTION, {
    variables: { userId: Auth.userID },
  });
  const myCurrentStatus = data && data.length > 0
    ? data[0].currentStatus
    : 'normal';

  return <ConnectionStatusButtonComponent myCurrentStatus={myCurrentStatus} {...props} />;
};

export default withTracker(() => {
  const { connected } = Meteor.status();

  return {
    connected,
  };
})(connectionStatusButtonContainer);
