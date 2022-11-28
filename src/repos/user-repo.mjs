
import pool from '../pool.mjs';
import toCamelCase from './utils/to-camel-case.mjs';

export default class UserRepo {
  static async find() {
    try {
      const { rows } = await pool.query('SELECT * FROM users;');

      return toCamelCase(rows);
    } catch (error) {
      console.error(error.message);
    }
  }

  static async findById(id) {
    try {
      const { rows } = await pool.query(`
        SELECT * FROM users WHERE id = $1;
      `, [id]);

      return toCamelCase(rows)[0];
    } catch (error) {
      console.error(error.message);
    }
  }

  static async insert(username, bio) {
    try {
      const {rows } = await pool.query('INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *;', [username, bio]);

      return toCamelCase(rows)[0];
    } catch (error) {
      console.error(error.message);
    }
  }

  static async update(id, username, bio) {
    try {
      const { rows } = await pool.query('UPDATE users SET updated_at = $4, username = $2, bio = $3 WHERE id = $1 RETURNING *;', [id, username, bio, new Date()]);

      return toCamelCase(rows)[0];
    } catch (error) {
      console.error(error.message);
    }
  }

  static async delete(id) {
    try {
      const {rows} = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [id]);

      return toCamelCase(rows)[0];
    } catch (error) {
      console.error(error.message);
    }
  }
}




