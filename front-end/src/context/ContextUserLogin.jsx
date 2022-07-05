import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function ContextUserLogin() {
  const [stateLogin, setStateLogin] = useState({});
  const [stateLoginResponse, setStateLoginResponse] = useState({});
  const history = useHistory();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken && userToken.length > 0) {
      history.push('/to-do-list');
    }
  }, []);

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
