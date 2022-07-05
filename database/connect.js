import knexFile  from '../knexfile.js';
import knex from 'knex';

export default knex(knexFile['development']);