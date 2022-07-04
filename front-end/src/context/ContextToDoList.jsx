import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import fetchToDoList from '../services/fetchToDoList';

function ContextToDoList({ children }) {
  const [stateToDoList, setToDoList] = useState([]);
  const [stateToDoListResponse, setStateToDoListResponse] = useState([]);

  useEffect(() => {
    fetchToDoList('http://localhost:3001/to-do-list', '')
      .then((data) => {
        if (Array.isArray(data)) {
          setToDoList(data);
        }
      });
  }, []);

  const context = {
    stateToDoList,
    setToDoList,
    stateToDoListResponse,
    setStateToDoListResponse,
  };

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

ContextToDoList.propTypes = {
  children: PropTypes.element,
};

ContextToDoList.defaultProps = {
  children: <>default</>,
};

export default ContextToDoList;
