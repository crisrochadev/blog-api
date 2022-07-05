// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import DB_Config from './database/DB_Config.js';
const db_config = new DB_Config();


export default {
  development: {
    client: "mysql",
    connection: {
      host: db_config.getHost,
      port: db_config.getPort,
      user: db_config.getUser,
      password: db_config.getPassword,
      database: db_config.getDatabase,
    },
    pool: {
      min: 0,
      max: 7
    },
    useNullAsDefault:true,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/database/migrations`
    }
    // ,
    // seeds: {
    //   directory: `${path.join(__dirname)}/datbase/seeds`
    // }
  },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
