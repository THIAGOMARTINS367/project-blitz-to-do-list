import express from 'express';
import UserController from './controllers/UserController';
import UserModel from './models/UserModel';
import UserService from './services/UserService';

const app = express();

app.use(express.json());

app.post('/sign-up', (req, res, next) => {
  new UserController(req, res, next).addNewUser(
    new UserService(new UserModel()),
  );
});

export default app;
