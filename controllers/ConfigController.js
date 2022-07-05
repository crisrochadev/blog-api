import knex from "../database/connect.js";
import bcrypt from "bcrypt";
import { request } from "express";
import fs from 'fs'
import DB_Config from "../database/DB_Config.js";

export default {
  async create(req, res, next) {
    try {
      const { email, password, dbname, name } = req.body;
      function createKey(num) {
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let key = "";
        const charactersLength = characters.length;
        for (let i = 0; i < num; i++) {
          key += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return key;
      }

      const key = createKey(20);
      bcrypt.hash(password, 10, async (errBcrypt, hashPassword) => {
        if (errBcrypt)
          return res.json({
            message: "Verifique seu email e tente novamente!",
            errBcrypt,
          });
        bcrypt.hash(email, 10, async (errBcrypt, hashEmail) => {
          if (errBcrypt)
            return res.json({
              message: "Verifique seu email e tente novamente!",
              errBcrypt,
            });
          bcrypt.hash(key, 10, async (errBcrypt, hashKey) => {
            if (errBcrypt)
              return res.json({
                message: "Verifique seu email e tente novamente!",
                errBcrypt,
              });
            const data = {
              email: hashEmail,
              password: hashPassword,
              name: name,
              key: hashKey,
              name: name,
            };
            const results = await knex("config").insert(data);
            return res.json({
              message: "Usuario Cadastrado com sucesso!",
              your_key: key,
              user_id:results[0],
            });
          });
        });
      });
    } catch (error) {
      next(error);
    }
  },
  async index(req, res, next){
    try {
        const {email,password} = req.body;
         const query = await knex('config')
         query.forEach(user => {
           const e = bcrypt.compareSync(email, user.email);
           const p = bcrypt.compareSync(password, user.password);

           if(!e) return res.status(401).json({message:"Verifique o Email!"})
           if(!p) return res.status(401).json({message:"Verifique a Senha!"})
           return res.json({message:"Logado com sucesso!"})
         })
        
    } catch (error) {
        next(error);
    }
  },
  async init(req,res,next){
    // const data = req.body;
    try {
      const db_config = new DB_Config();
      const {host,port,user,password,database} = req.body;
      const data = `
DB_HOST=${host}
DB_PORT=${port}
DB_USER=${user}
DB_PASSWORD=${password}
DB_DATABASE_NAME=${database}
      `
    
      fs.writeFile('.env', data, async (err) => {
        if(err) return res.status(500).json({message:"Nao conseguimos criar os arquivos necessários",erro:err})
        else {
          db_config.setHost = host;
          db_config.setPort = port;
          db_config.setUser = user;
          db_config.setPassword = password;
          db_config.setDatabase = database;
          
            knex.migrate.latest()
            .then((mig) => {
              return res.json({message:"Tabelas criadas com sucesso!", mig})
            })
            .catch((err) => {
              return res.json({message:"As tabelas não foram criadas", err})
            })
          
        }
      })
    } catch (error) {
      next(error);
    }
    
  },
  async update(req, res, next){
    try {
      const data = req.body;
      const {id} = req.params;
      const results = await knex("config").update(data).where({key});

      return res.json({message:"Dados atualizado com sucesso",data: results});
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const {id} = req.params;
      const results = await knex("config").update({deleted_at: new Date(Date.now())}).where({key});

      return res.json({message:"Conta deletada!",data: results});
    } catch (error) {
      next(error);
    }
  },
  async delete_permanently(req,res, next){
    const {id} = req.params;
    try {
      const results = await knex("condig").where({key}).whereNot({deleted_at:null});
    } catch (error) {
      next(error);
    }
  }
};
