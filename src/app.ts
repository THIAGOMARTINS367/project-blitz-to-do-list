import express from 'express';
import UserController from './controllers/UserController';
import UserModel from './models/UserModel';
import UserService from './services/UserService';
import errorMiddleware from './middlewares/error';
import TaskController from './controllers/TaskController';
import TaskModel from './models/TaskModel';
import TaskService from './services/TaskService';
import TokenAuthenticator from './middlewares/TokenAuthenticator';

const app = express();

app.use(express.json());

app.post('/sign-up', (req, res, next) => {
  new UserController(req, res, next).addNewUser(
    new UserService(new UserModel()),
  );
});

app.post('/login', (req, res, next) => {
  new UserController(req, res, next).userLogin(
    new UserService(new UserModel()),
  );
});

app.get(
  '/to-do-list',
  (req, _res, next) => new TokenAuthenticator(req, next).validateJwtToken(),
  (req, res, next) => {
    new TaskController(req, res, next).getUserTaskList(
      new TaskService(new TaskModel()),
    );
  },
);

app.post(
  '/to-do-list',
  (req, _res, next) => new TokenAuthenticator(req, next).validateJwtToken(),
  (req, res, next) => {
    new TaskController(req, res, next).addNewTask(
      new TaskService(new TaskModel()),
    );
  },
);

app.put(
  '/to-do-list/:taskId',
  (req, _res, next) => new TokenAuthenticator(req, next).validateJwtToken(),
  (req, res, next) => {
    new TaskController(req, res, next).updateTask(
      new TaskService(new TaskModel()),
    );
  },
);

app.delete(
  '/to-do-list',
  (req, _res, next) => new TokenAuthenticator(req, next).validateJwtToken(),
  (req, res, next) => {
    new TaskController(req, res, next).deleteTasks(
      new TaskService(new TaskModel()),
    );
  },
);

app.use(errorMiddleware);

export default app;
