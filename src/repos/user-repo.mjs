
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
    // WARNING: REALLY BIG SECURITY ISSUE!
    try {
      const { rows } = await pool.query(`
        SELECT * FROM users WHERE id = ${id};
      `);

      return toCamelCase(rows)[0];
    } catch (error) {
      console.error(error.message);
    }
  }

  static async insert() {

  }

  static async update() {

  }

  static async delete() {

  }
}




