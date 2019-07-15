/* eslint-disable no-console */
import { pool } from '../index';
import 'dotenv/config';

pool.on('connect', () => {
  console.log('connected to the db');
});

const createBusesTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    buses(
      id SERIAL PRIMARY KEY,
      fleet_number VARCHAR(25) NOT NULL,
      number_plate VARCHAR(25) NOT NULL,
      manufacturer VARCHAR(50) NOT NULL,
      year VARCHAR(25) NOT NULL,
      model VARCHAR(25),
      capacity INT NOT NULL,
      created_date TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (fleet_number)
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

const dropBusesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS buses cascade';
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
  createBusesTable,
  dropBusesTable,
};

require('make-runnable');
