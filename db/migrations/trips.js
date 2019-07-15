/* eslint-disable no-console */
import { pool } from '../index';
import 'dotenv/config';

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTripsTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    trips(
      id SERIAL PRIMARY KEY,
      bus_id INT REFERENCES buses(id) ON DELETE CASCADE,
      origin VARCHAR(255) NOT NULL,
      destination VARCHAR(255) NOT NULL,
      trip_date DATE NOT NULL,
      fare DECIMAL NOT NULL,
      status trip_status DEFAULT 'active',
      created_on TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTripsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS trips cascade';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

export {
  createTripsTable,
  dropTripsTable,
};

require('make-runnable');
