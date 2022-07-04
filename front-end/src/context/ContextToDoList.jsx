import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchToDoList from '../services/fetchToDoList';

function ContextToDoList() {
  const [stateToDoList, setToDoList] = useState([]);
  const [stateToDoListResponse, setStateToDoListResponse] = useState([]);
  const [stateUserToken, setStateUserToken] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const { location: { pathname } } = history;
    const token = stateUserToken || localStorage.getItem('userToken');
    if (pathname === '/to-do-list' && token && token.length > 0) {
      fetchToDoList('http://localhost:3001/to-do-list', token)
        .then((data) => {
          if (Array.isArray(data)) {
            setToDoList(data);
          } else {
            localStorage.setItem('userToken', undefined);
            history.push('/to-do-list/login');
          }
        });
    } else if (pathname === '/to-do-list') {
      history.push('/to-do-list/login');
    }
  }, [stateUserToken]);

  return {
    stateToDoList,
    setToDoList,
    stateToDoListResponse,
    setStateToDoListResponse,
    stateUserToken,
    setStateUserToken,
  };
}

ContextToDoList.propTypes = {
  children: PropTypes.element,
};

ContextToDoList.defaultProps = {
  children: <>default</>,
};

export default ContextToDoList;
