import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function ToDoList() {
  const {
    stateToDoList,
    setStateUserToken,
  } = useContext(Context);
  return (
    <section>
      <header>
        <Link
          to="/to-do-list/login"
          onClick={() => {
            localStorage.setItem('userToken', '');
            setStateUserToken(undefined);
          }}
        >
          <button type="button">Logout</button>
        </Link>
      </header>
      <h1>LISTA DE TAREFAS</h1>
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Última Alteração</th>
          </tr>
        </thead>
        <tbody>
          {
            stateToDoList.map(({ taskContent, status, updatedAt }) => (
              <tr key={`${status}-${updatedAt}`}>
                <td>{taskContent}</td>
                <td>{status}</td>
                <td>{updatedAt}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </section>
  );
}

export default ToDoList;
