import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextUserSignUp({ children }) {
  const [state, setState] = useState({ admin: false });
  const [stateSignUpResponse, setStateSignUpResponse] = useState({});

  const context = {
    state,
    setState,
    stateSignUpResponse,
    setStateSignUpResponse,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

ContextUserSignUp.propTypes = {
  children: PropTypes.element,
};

ContextUserSignUp.defaultProps = {
  children: <>default</>,
};

export default ContextUserSignUp;
