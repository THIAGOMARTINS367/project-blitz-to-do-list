import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [state, setState] = useState({ admin: false });

  const context = {
    state,
    setState,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.element,
};

ContextProvider.defaultProps = {
  children: <>default</>,
};

export default ContextProvider;
