
import express from 'express';
import usersRouter from './routes/users.mjs';

export default () => {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);

  return app;
}






























