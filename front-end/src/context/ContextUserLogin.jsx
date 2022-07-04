import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ContextUserLogin() {
  const [stateLogin, setStateLogin] = useState({});
  const [stateLoginResponse, setStateLoginResponse] = useState({});

  return {
    stateLogin,
    setStateLogin,
    stateLoginResponse,
    setStateLoginResponse,
  };
}

ContextUserLogin.propTypes = {
  children: PropTypes.element,
};

ContextUserLogin.defaultProps = {
  children: <>default</>,
};

export default ContextUserLogin;
