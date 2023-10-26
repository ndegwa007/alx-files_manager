import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  // App Controller

  // should return if Redis is alive and if the DB is alive
  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  // should return the number of users and files in DB
  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  // users routes
  router.post('/users', (req, res) => {
    UsersController.postNew(req, res);
  });

  router.get('/users/me', (req, res) => {
    UsersController.getMe(req, res);
  });

  // authentication
  router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
  });

  router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
  });

  // files upload
  router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
  });
}
export default controllerRouting;
