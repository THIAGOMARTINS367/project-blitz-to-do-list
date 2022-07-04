import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ContextUserSignUp() {
  const [state, setState] = useState({ admin: false });
  const [stateSignUpResponse, setStateSignUpResponse] = useState({});

  return {
    state,
    setState,
    stateSignUpResponse,
    setStateSignUpResponse,
  };
}

ContextUserSignUp.propTypes = {
  children: PropTypes.element,
};

ContextUserSignUp.defaultProps = {
  children: <>default</>,
};

export default ContextUserSignUp;
