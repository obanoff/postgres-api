// main file, app runner.

import app from './src/app.js';
import pool from './src/pool.js';

const port = 3005;

try {
  await pool.connect({
    host: 'localhost',
    post: 5432,
    database: 'socialnetwork',
    user: 'eugene',
    password: ''
  });
  
  app().listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
}
catch (e) {
  console.error(e.message);
}












