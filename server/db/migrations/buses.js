/* eslint-disable no-console */
import { pool, query } from '../index';
import 'dotenv/config';
import busModel from '../../models/Buses';

pool.on('connect', () => {
  console.log('connected to the db');
});

const createBusesTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    buses(
      id SERIAL PRIMARY KEY,
      number_plate VARCHAR(25) NOT NULL,
      manufacturer VARCHAR(50) NOT NULL,
      year VARCHAR(25) NOT NULL,
      model VARCHAR(25) NOT NULL,
      capacity INT NOT NULL,
      created_date TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (number_plate)
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

const seedBus = async () => {
  const { createBus } = busModel;
  const queryText = createBus;
  console.log(queryText);
  const values = [
    'APP-456CV',
    'Toyota',
    'Hiace',
    '2010',
    '80',
  ];

  try {
    const { rows } = await query(queryText, values);
    console.log(rows[0]);
  } catch (error) {
    console.log(error);
  }
};

export {
  createBusesTable,
  dropBusesTable,
  seedBus,
};

require('make-runnable');
