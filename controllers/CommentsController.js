import knex from "../database/connect.js";

export default {
  async create(req, res, next) {
    try {
      const { title, content, author } = req.body;
      const { post_id } = req.params;
      const { avatar: comments_avatar } = req.query;
      let query;

      if (comments_avatar) {
        query = await knex("comments").insert({
          title,
          content,
          author,
          comments_avatar,
          post_id,
        });
      } else {
        query = await knex("comments").insert({
          title,
          content,
          author,
          post_id,
        });
      }

      return res.json({
        message: `Comentário ${title}, inserido com sucesso!`,
        query,
      });
    } catch (err) {
      next(err);
    }
  },
  async index(req, res, next) {
    try {
      const { post_id } = req.params;

      const query = knex("comments").where({deleted_at:null});

      if (post_id) query.where({ post_id: post_id });

      const results = await query;
      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const results = await knex("comments").update(data).where({ id: id });

      return res.json({
        message: `Comentario de id ${id} atuailizado com sucesso!`,
        results,
      });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      const { del_id: id } = req.params;
      const deleted_at = new Date(Date.now());
      const query = knex("comments").update({ deleted_at }).where({ id });
      const results = await query;
      return res.json(results);
    } catch (error) {
      next(error);
    }
  },
  async trash(req, res, next) {
    try {
      const { id } = req.params;

      let message = "Comentarios da Lixeira";
      const query = knex("comments").whereNot({ deleted_at: null });

      if (id) {
        query.update({ deleted_at: null }).where({ id });
        message = `Comentarios com id ${id} foi recuperado!`;
      }
      const results = await query;
      return res.json({ message: message, results });
    } catch (error) {
      next(error);
    }
  },
  async del_permanently(req, res, next) {
    try {
      const { del_id } = req.params;
      const query = knex('comments')
      .where({id: del_id})
      .whereNot('deleted_at', null)
      .del()

        
      const results = await query;
      return res.json({
        message: "Comentário deletado Permanentemente!",
        results,
      });
    } catch (error) {
      next(error);
    }
  },
};
