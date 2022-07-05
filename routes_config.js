import express from 'express';
import ConfigController from './controllers/ConfigController.js';
const router_config = express.Router();



//Config
router_config.post('/config/register',ConfigController.create);
router_config.post('/config/login',ConfigController.index);
router_config.post('/config',ConfigController.init);
router_config.put('/config/:key/:id',ConfigController.update);
router_config.put('/config/:key/:id',ConfigController.delete);
router_config.delete('/config/:key/:id',ConfigController.delete_permanently);

export default router_config;