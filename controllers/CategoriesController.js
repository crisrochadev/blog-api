import { query } from "express";
import knex from "../database/connect.js";

export default {
  async create(req, res, next) {
    try {
      const { name, slug } = req.body;
      let newSlug;
      if (slug)
        newSlug = slug
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^0-9a-zA-Z]/g, "-")
          .toLowerCase();
      else
        newSlug = name
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^0-9a-zA-Z]/g, "-")
          .toLowerCase();

      const results = await knex("categories").insert({
        name: name,
        slug: newSlug,
      });

      return res.json({
        message: `Categoria ( ${name} ) adcionada com sucesso! - ${newSlug}`,
      });
    } catch (e) {
      next(e);
    }
  },
  async index(req, res, next) {
    try {
      const { cat_id } = req.query;
      let query;

      if (cat_id) {
        query = knex()
          .table("catposts")
          .select([
            "categories.name as category_name",
            "posts.id as post_id",
            "posts.title as post_title",
            "posts.content as post_content",
          ])
          .innerJoin("categories", "categories.id", "catposts.categories_id")
          .innerJoin("posts", "posts.id", "catposts.post_id")
          .where({ categories_id: cat_id , deleted_at:null});
      } else {
        query = knex().select(["id","name"]).table("categories").where({deleted_at:null});
      }

      const results = await query;
      return res.send(results);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const id = req.params.id;
      const data = req.body;
      let query;
      let newCat;
      let newSlug;
        if (data.slug) {
          newSlug = data.slug
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^0-9a-zA-Z]/g, "-")
            .toLowerCase();
        } else
          newSlug = data.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^0-9a-zA-Z]/g, "-")
            .toLowerCase();

      newCat = {
        name: data.name,
        slug: newSlug,
      };
     query = knex("categories").update(newCat).where({id});

      const results = await query;
      return res.send({
        message: ` Categoria autizada com sucesso! `,
        results,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req,res,next) {
    try {
        const {del_id:id} = req.params
        const deleted_at = new Date(Date.now())
        const query = knex("categories").update({deleted_at}).where({id})
        const results =  await query;
        return res.json(results)
    } catch (error) {
        next(error);
    }
    
  },
  async del_permanently(req, res, next) {
    try {
        const {del_id} = req.params
        const query  = knex('categories')
        .where({id: del_id})
        .whereNot('deleted_at', null)
        .del()
        const results =  await query;
      return res.json({message:"Categoria deletada Permanentemente!",results})
    } catch (error) {
        next(error);
    }
  },
  async trash(req, res, next){
    try {
      const {id} = req.params

        let message= "Categoria da Lixeira"
        const query =   knex("categories").whereNot({deleted_at:null});
        if(id){
          query.update({deleted_at:null}).where({id})
          message = `Categoria com id ${id} foi recuperada!`;
        }

        const results =await query;
        return res.json(results);

    } catch (error) {
        next(error);  
    }
  }
};
