import express from 'express';
import CategoriesController from './controllers/CategoriesController.js';
import CommentsController from './controllers/CommentsController.js';
import ConfigController from './controllers/ConfigController.js';
import FilesController from './controllers/FilesController.js';
import PostsController from './controllers/PostsController.js';
import upload from './middleware/UploadMiddleware.js';
const router = express.Router();


//Config
router.post('/config/register',ConfigController.create);
router.post('/config/login',ConfigController.index);

//postagens
router.post('/:key/posts',PostsController.create); // cria uma postagem com  categories array no corpo para add categorias
router.get('/:key/posts/:id',PostsController.index); // Busca posts com um id especifico
router.get('/:key/posts',PostsController.index); // busca todos os posts
router.put('/:key/posts/:id',PostsController.update); // Atualiza Post Especifico
router.put('/:key/posts/del/:del_id',PostsController.delete); // Envia para Lixeira Post Especifico
router.get('/:key/posts-trash',PostsController.trash); // Exibe posts na lixeira
router.delete('/:key/posts/del/:del_id',PostsController.del_permanently) // Deleta permanentemente a Postagem
router.put('/:key/posts-trash/:id',PostsController.trash); // Exibe posts na lixeira

//Categorias
router.post('/:key/categories',CategoriesController.create) // cria categoria
router.get('/:key/categories',CategoriesController.index) // recebe as categorias - passa ?cat_id= para uma cat em expecifico e isso traz os posts dela. 
router.get('/:key/categories-trash',CategoriesController.trash) // traz as categorias apagadas
router.put('/:key/categories-trash/:id',CategoriesController.trash) // Recupera Categoria da lixeira
router.put('/:key/categories/:id',CategoriesController.update) // atualiza a categoria 
router.put('/:key/categories/del/:del_id',CategoriesController.delete) // manda a categoria para a lixeira
router.delete('/:key/categories/del/:del_id',CategoriesController.del_permanently) // Deleta permanentemente a categoria

//Comentarios
router.post('/:key/comments/:post_id', CommentsController.create)
router.get('/:key/comments/:post_id', CommentsController.index)
router.get('/:key/comments', CommentsController.index)
router.get('/:key/comments-trash',CommentsController.trash) // traz os comentários apagadas
router.put('/:key/comments-trash/:id',CommentsController.trash) // Recupera comentarios da lixeira
router.put('/:key/comments/:id',CommentsController.update) // atualiza o comentario 
router.put('/:key/comments/del/:del_id',CommentsController.delete) // manda o comentario para a lixeira
router.delete('/:key/comments/del/:del_id',CommentsController.del_permanently) // Deleta permanentemente o comentarios

//files
router.post('/:key/files',upload.single('image'),FilesController.create)
router.get('/:key/files/:id', FilesController.index)
router.get('/:key/files', FilesController.index)
router.get('/:key/files-trash',FilesController.trash) // traz os arquivos apagadas
router.put('/:key/files-trash/:id',FilesController.trash) // Recupera arquivos da lixeira
router.put('/:key/files/:id',FilesController.update) // atualiza o arquivo 
router.put('/:key/files/del/:del_id',FilesController.delete) // manda o arquivo para a lixeira
router.delete('/:key/files/del/:del_id',FilesController.del_permanently) // Deleta permanentemente o arquivo

export default router