import bodyParser from 'body-parser';
import authRouter from './authRouter';

export default (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api/v1/auth', authRouter);
};
