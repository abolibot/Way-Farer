import pool from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

export default {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
