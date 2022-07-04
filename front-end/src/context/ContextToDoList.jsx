import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchToDoList from '../services/fetchToDoList';

function ContextToDoList() {
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

  return {
    stateToDoList,
    setToDoList,
    stateToDoListResponse,
    setStateToDoListResponse,
  };
}

ContextToDoList.propTypes = {
  children: PropTypes.element,
};

ContextToDoList.defaultProps = {
  children: <>default</>,
};

export default ContextToDoList;
