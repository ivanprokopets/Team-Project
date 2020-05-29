import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuthRedirect = (WrappedComponent: any) => {
  return class extends React.Component {
    constructor(props:any) {
      super(props);
    }
    render() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  };
};
export default withAuthRedirect;
