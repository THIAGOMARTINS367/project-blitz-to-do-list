import React, { useContext } from 'react';
import Context from '../context/Context';

function ToDoList() {
  const {
    stateToDoList,
  } = useContext(Context);
  return (
    <section>
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
              <tr>
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
