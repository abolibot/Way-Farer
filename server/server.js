import express from 'express';
import 'dotenv/config';
import routes from './routes/index';

const app = express();
routes(app);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Running on port ${port}`); // eslint-disable-line no-console
});

export default server;
