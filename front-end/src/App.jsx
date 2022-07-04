import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import UserSignUp from './pages/UserSignUp';
import UserLogin from './pages/UserLogin';
import ToDoList from './pages/ToDoList';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <main>
      <ContextProvider>
        <Switch>
          <Route path="/to-do-list/sign-up" component={UserSignUp} />
          <Route path="/to-do-list/login" component={UserLogin} />
          <Route path="/" component={ToDoList} />
        </Switch>
      </ContextProvider>
    </main>
  );
}

export default App;
