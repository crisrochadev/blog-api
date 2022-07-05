import express, { application, json } from 'express';
import AuthMiddleware from './middleware/AuthMiddleware.js';
import ConfigAuthMiddleware from './middleware/ConfigAuthMiddleware.js';
const app = express();
import router from './routes.js';
import router_config from './routes_config.js';

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.json());

app.use('/config/:key',ConfigAuthMiddleware);
app.use(router_config);

app.use('/:key',AuthMiddleware)
app.use(router);
app.use((req,res,next) => {
    const error = new Error('Esta rota não existe!');
    error.status = 404;
    next(error);
  })
  app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({error: error.message});
  })



app.listen( 5000,() => {
    console.log('listening on port http://localhost:5000');
})