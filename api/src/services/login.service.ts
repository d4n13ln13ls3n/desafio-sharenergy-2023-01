import * as jwt from 'jsonwebtoken';
import BadRequestHttpError from '../errors/httpErrors/BadRequest';
import env from '../config/env';
import bcrypt from 'bcryptjs';

import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';
import { AuthenticationCredentials, IUser, JWTPayload } from '../interfaces';
import UserModel from '../database/models/UserODM';
import TokenAuth from '../utils/auth';


export default class LoginService {
  [x: string]: any;
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }
  
  static createAccessToken(user: IUser) {
    const { username, id } = user;
    const token = jwt.sign({ username, id }, env.jwtSecret, { expiresIn: '1w' });
    return token;
  }
  
  static validateAccessToken(token: string) {
    if (!token) {
      throw new UnauthorizedHttpError('Token must be a valid token');
    }

    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      return decoded as JWTPayload;
    } catch (err) {
      throw new UnauthorizedHttpError('Token must be a valid token');
    }
  }

  static loginValidation(authorization: string) {
    if (!authorization) {
      throw new BadRequestHttpError('Token not found');
    }
    const payload = TokenAuth.decrypt(authorization);
    return payload;
  }

  login = async ({ username, password }: AuthenticationCredentials) => {
    const user = await this.userModel.getByUsername(username);
    // console.log('user:', user);

    if (user === null) {
      return null;
    }

    const validPassword = TokenAuth.compare(password, user.password);
    console.log('validPassword:', validPassword);
    console.log('password:', password);
    // console.log('user.password:', user.password);
    if (!validPassword) {
      return null;
    }
    const token = LoginService.createAccessToken(user);
    return token;
  }


}