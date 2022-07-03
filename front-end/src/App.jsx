import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import ToDoList from './pages/ToDoList';
import ContextUserSignUp from './context/ContextUserSignUp';
import ContextUserLogin from './context/ContextUserLogin';

function App() {
  return (
    <main>
      <ContextUserSignUp>
        <Switch>
          <Route path="/to-do-list/sign-up" component={UserSignUp} />
          <ContextUserLogin>
            <Route path="/to-do-list/login" component={UserLogin} />
          </ContextUserLogin>
          <Route path="/" component={ToDoList} />
        </Switch>
      </ContextUserSignUp>
    </main>
  );
}

export default App;
