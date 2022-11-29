// helper class to establish/close a new connection to DB via a new random role and a schema with the same name
// using for parallel testing with the same DB


import pool from '../pool';
import { randomBytes } from 'crypto';
import migrate from 'node-pg-migrate';
import format from 'pg-format';

const DEFAULT_OPTS = {
  host: 'localhost',
  port: 5432,
  database: 'socialnetwork-test',
  user: 'eugene',
  password: '',
};


export default class Context {
  static async build() {
    // Randomly generating a role name to connect to PG as
    const roleName = 'a' + randomBytes(4).toString('hex');

    // Connect to PG as usual
    await pool.connect(DEFAULT_OPTS);

    // Create a new role
    await pool.query(format(
      'CREATE ROLE %I WITH LOGIN PASSWORD %L;', roleName, roleName
    ));

    // Create a schema with the same name
    await pool.query(format(
      'CREATE SCHEMA %I AUTHORIZATION %I;', roleName, roleName
    ));

    // Disconnect entirely from PG
    await pool.close();

    // Run our migrations in the new schema
    await migrate({
      schema: roleName,
      direction: 'up',
      log: () => {},
      noLock: true,
      dir: 'migrations',
      databaseUrl: {
        host: 'localhost',
        post: 5432,
        database: 'socialnetwork-test',
        user: roleName,
        password: roleName
      }
    });

    // Connect to PG as the newly created role
    await pool.connect({
      host: 'localhost',
      post: 5432,
      database: 'socialnetwork-test',
      user: roleName,
      password: roleName
    });

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  // Delete all data from the table/tables. Helpful if there are multiple tests in a single file and needs to run them on a fresh data slate
  async reset() {
    return await pool.query(
      'DELETE FROM users;'
    );
  }

  async close() {
    // Disconnect from PG
    await pool.close();

    // Reconnect as our root user
    await pool.connect(DEFAULT_OPTS);

    // Delete the role and schema we created
    await pool.query(format(
      'DROP SCHEMA %I CASCADE;', this.roleName
    ));
    await pool.query(format(
      'DROP ROLE %I;', this.roleName
    ))

    // Disconnect
    await pool.close();
  }
}