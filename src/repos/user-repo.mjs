
import pool from 'pool.mjs';

export default class UserRepo {
  static async find() {
    try {
      const { rows } = await pool.query('SELECT * FROM users;');
      return rows;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async findById() {

  }

  static async insert() {

  }

  static async update() {

  }

  static async delete() {

  }
}




