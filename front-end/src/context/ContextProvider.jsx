import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import ContextUserSignUp from './ContextUserSignUp';
import ContextUserLogin from './ContextUserLogin';
import ContextToDoList from './ContextToDoList';

function ContextProvider({ children }) {
  const userSignUp = ContextUserSignUp();
  const userLogin = ContextUserLogin();
  const toDoList = ContextToDoList();

  const context = {
    ...userSignUp,
    ...userLogin,
    ...toDoList,
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
