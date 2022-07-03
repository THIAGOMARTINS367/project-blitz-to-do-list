import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextUserLogin({ children }) {
  const [stateLogin, setStateLogin] = useState({});
  const [stateLoginResponse, setStateLoginResponse] = useState({});

  const context = {
    stateLogin,
    setStateLogin,
    stateLoginResponse,
    setStateLoginResponse,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

ContextUserLogin.propTypes = {
  children: PropTypes.element,
};

ContextUserLogin.defaultProps = {
  children: <>default</>,
};

export default ContextUserLogin;
