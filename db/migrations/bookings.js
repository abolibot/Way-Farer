/* eslint-disable no-console */
import { pool } from '../index';
import 'dotenv/config';

const createBookingsTable = () => {
  pool.on('connect', () => {
    console.log('connected to the db');
  });

  const queryText = `
  CREATE TABLE IF NOT EXISTS
    bookings(
      id SERIAL,
      trip_id INT REFERENCES trips(id) ON DELETE CASCADE,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      created_on Date NOT NULL,
      PRIMARY KEY (trip_id, user_id)
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

const dropBookingsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS bookings cascade';
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
  createBookingsTable,
  dropBookingsTable,
};

require('make-runnable');
