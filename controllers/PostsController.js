import { request } from "express";
import knex from "../database/connect.js";

export default {
  async index(req, res, next) {
    try{
      const {id} =  req.params;
      const query =  knex("posts")
      .where("deleted_at",null)

    if(id){
      query.where({id})
    }
        const results =  await query;
        return res.json(results)
    }
    catch(err){ next(err); }
    
  },
  async create(req, res, next) {
    try {
      const { title, content, categories } = req.body;
      const { author } = req.query;
      let category;
      let results;
      let query;

      results = await knex("posts").insert({ title, content, author });

      if (categories) {
          category = categories.map(id => {
           return {post_id: results[0], categories_id:id}
          })
        query = await knex("catposts").insert(category)
      }

      return res.json({ message: `ok`, results});
    } catch (e) {
      next(e);
    }
  },
  async update(req, res, next){
    try {
      const {id} = req.params;
      const data = req.body;
       const results = await knex("posts").update(data).where({id: id});

       return res.json({message:`Postagem de id ${id} atuailizada com sucesso!`,results});
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next){
    try {
      const {del_id:id} = req.params
      const deleted_at = new Date(Date.now())
      const query = knex("posts").update({deleted_at}).where({id})
      const results =  await query;
      return res.json(results)
  } catch (error) {
      next(error);
  }
  },
  async trash(req, res, next){
    
    try {

      const {id} = req.params

        let message= "Postagens da Lixeira"
        const query = knex("posts").whereNot({deleted_at:null});

        if(id){
          query.update({deleted_at:null}).where({id})
          message = `Postagem com id ${id} foi recuperada!`;
        }
        const results = await query;
        return res.json({message:message,results});

    } catch (error) {
        next(error);  
    }
  },
  async del_permanently(req, res, next) {
    try {
      const {del_id} = req.params
      const query = knex('posts')
      .where({id: del_id})
      .whereNot('deleted_at', null)
      .del()
      const results =  await query;
      return res.json({message:"postagem deletada Permanentemente!",results})
  } catch (error) {
      next(error);
  }
  }
};
