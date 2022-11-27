
import app from './src/app.mjs';
import pool from './src/pool.mjs';

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












