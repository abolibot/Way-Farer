import express from 'express';
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('TeeMac says Hi!');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`); // eslint-disable-line no-console
});
