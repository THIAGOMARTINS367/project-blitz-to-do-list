import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import ToDoList from './pages/ToDoList';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/to-do-list/sign-up" component={UserSignUp} />
        <Route path="/to-do-list/login" render={UserLogin} />
        <Route path="/" render={ToDoList} />
      </Switch>
    </main>
  );
}

export default App;
