import { Request, Response, NextFunction } from 'express';
import UserService from '../services/users.service';
// import UserModel from '../database/models/UserODM';
// import { User } from '../interfaces';
// import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

export default class UserController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private userService: UserService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = new UserService();
  }
  
  public async makeUsersList() {
    const users = await this.userService.makeUserList();
    return this.res.status(200).json(users);
  }
  
}