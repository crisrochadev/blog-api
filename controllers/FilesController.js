import knex from '../database/connect.js';


export default {
    async create(req, res, next){
      
        try{
            const{originalname, filename,path} = req.file;
            const results = await knex("files").insert( {file_name:filename,file_path:path} )

            return res.json({message:`Imagem ${originalname} salva com sucesso`, results});
        }catch(err) { next(err); }
    },
    async index(req, res, next){
        const id = req.params.id;
        try {
            const query = knex("files")

            if(id) query.where({id})

            const results = await query;
            return res.send(results)
        } catch (error) {
            next(error);
        }
    },
    async update(req, res, next){
      try {
        const {id} = req.params;
        const data = req.body;
         const results = await knex("files").update(data).where({id: id});
  
         return res.json({message:`Arquivo de id ${id} atuailizado com sucesso!`,results});
      } catch (error) {
        next(error);
      }
    },
    async delete(req, res, next){
      try {
        const {del_id:id} = req.params
        const deleted_at = new Date(Date.now())
        const query = knex("files").update({deleted_at}).where({id})
        const results =  await query;
        return res.json(results)
    } catch (error) {
        next(error);
    }
    },
    async trash(req, res, next){
      
      try {
  
        const {id} = req.params
  
          let message= "Arquivos da Lixeira"
          const query = knex("files").whereNot({deleted_at:null});
  
          if(id){
            query.update({deleted_at:null}).where({id})
            message = `Arquivo com id ${id} foi recuperado!`;
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
        const query = knex('files')
        .where({id: del_id})
        .whereNot('deleted_at', null)
        .del()
        const results =  await query;
        return res.json({message:"Arquivo deletado Permanentemente!",results})
    } catch (error) {
        next(error);
    }
    }
}

