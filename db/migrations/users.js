/* eslint-disable no-console */
import { pool, query } from '../index';
import 'dotenv/config';
import hashPassword from '../../server/helpers/passwordEncryption';
import generateToken from '../../server/helpers/tokenGeneration';

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTable = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255),
      is_admin BOOLEAN NOT NULL DEFAULT false,
      created_date TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (email)
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

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users cascade';
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

const seedUser = async () => {
  const hashedPassword = await hashPassword('pass4321', 10);
  const queryText = `
  INSERT INTO
    users(
      first_name, last_name, email, is_admin, password)
    VALUES($1, $2, $3, $4, $5)
    returning *
  `;
  const values = [
    'Admin',
    'User',
    'admin@abolibot-wayfarer.com',
    true,
    hashedPassword,
  ];

  try {
    const { rows } = await query(queryText, values);
    console.log(rows[0]);
    const token = generateToken(rows[0]);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};

export {
  createUsersTable,
  dropUsersTable,
  seedUser,
};

require('make-runnable');
