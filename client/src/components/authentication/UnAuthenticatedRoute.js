import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, ...rest }) => {
  if (user === undefined) {
	return <div>Loading...</div>;
  }
  if (user === null) {
	return <Component user={user} {...rest} />;
  }
  return <Redirect to="/" />;
};

const UnauthenticatedRoute = ({ component, user, ...rest }) => {
  return (
	<Route
	  // eslint-disable-next-line react/jsx-props-no-spreading
	  {...rest}
	>
	  <AuthenticationCheck user={user} component={component} {...rest} />
	</Route>
  );
};

export default UnauthenticatedRoute;
