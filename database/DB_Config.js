import "dotenv/config";

export default class DB_Config {
  constructor() {
    this.host = process.env.DB_HOST;
    this.port = process.env.DB_PORT;
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASSWORD;
    this.database = process.env.DB_DATABASE_NAME;
  }

  set setHost(host) {
    this.host = process.env.DB_HOST ? process.env.DB_HOST : host;
  }

  set setPort(port) {
    this.port = process.env.DB_PORT ? process.env.DB_PORT : port;
  }

  set setUser(user) {
    this.user = process.env.DB_USER ? process.env.DB_USER : user;
  }

  set setPassword(password) {
    this.password = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : password;
  }

  set setDatabase(database) {
    this.database = process.env.DB_DATABASE_NAME ? process.env.DB_DATABASE_NAME : database;
  }

  get getHost(){
    return this.host;
  }
  get getPort(){
    return this.port;
  }
  get getUser(){
    return this.user;
  }
  get getPassword(){
    return this.password;
  }
  get getDatabase(){
    return this.database;
  }
}
