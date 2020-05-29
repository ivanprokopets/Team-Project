import React from 'react';
import { Redirect } from 'react-router-dom';

const withExistToken = (WrappedComponent: any) => {
  return class extends React.Component {
    constructor(props:any) {
      super(props);
    }
    render() {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const { time } = JSON.parse(token);
        if (new Date().getTime() > time + 1800000) {
          localStorage.removeItem('accessToken');
        } else {
          return <WrappedComponent {...this.props} />;
        }
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  };
};
export default withExistToken;
