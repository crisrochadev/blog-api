import knex from "../database/connect.js";
import bcrypt from 'bcrypt';
export default async (req, res, next) => {
  try {
    const err = new Error("VocE não esta autenticado!")
    err.status = 401
    let isKey;
    const key = req.params.key
    if(key){
        
        const query = await knex("config")
        query.forEach(user => {
            isKey = bcrypt.compareSync(key, user.key);
        })
        if(isKey) return next();
        else return next(err);
        
    }else{
        return next(err)
    }
  } catch (error) {
    next(error)
  }
};
