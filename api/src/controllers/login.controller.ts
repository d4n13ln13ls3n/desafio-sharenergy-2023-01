import { Request, Response } from 'express';
import { AuthenticationCredentials } from '../interfaces';
import LoginService from '../services/login.service';
import UserModel from '../database/models/UserODM';
import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

export default class LoginController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }
  login = async (req: Request, res: Response) => {
    const token = await this.loginService.login(
      req.body as AuthenticationCredentials,
    );
    console.log('token:', token);
    if (!token) {
      throw new UnauthorizedHttpError('Incorrect username or password');
    }

    return res.status(200).json({ token });
  };

}