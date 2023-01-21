import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';
import UserController from '../controllers/user.controller';
import CatController from '../controllers/cat.controller';
import CustomerController from '../controllers/customer.controller';

const routes = Router();

const loginController = new LoginController();
// const userController = new UserController();

routes.post('/login', 
  LoginMiddleware, 
  (req, res, _next) =>  loginController.login(req, res),
  );

routes.get('/users', 
  (req, res, next) =>  new UserController(req, res, next).makeUsersList(),
);

routes.get('/cats/:code', 
  (req, res, next) =>  new CatController(req, res, next).getPictureByCode(),
);

routes.get(
  '/customers/',
  (req, res, next) => new CustomerController(req, res, next).getAll(),
);

routes.get(
  '/customers/:id',
  (req, res, next) => new CustomerController(req, res, next).getById(),
);

routes.post(
  '/customers',
  (req, res, next) => new CustomerController(req, res, next).create(),
);

routes.put(
  '/customers/:id',
  (req, res, next) => new CustomerController(req, res, next).updateCustomer(),
);

routes.delete(
  '/customers/:id',
  (req, res, next) => new CustomerController(req, res, next).deleteCustomer(),
);

export default routes;