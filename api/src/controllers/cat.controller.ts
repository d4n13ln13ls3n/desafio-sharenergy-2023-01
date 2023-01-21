import { Request, Response, NextFunction } from 'express';
import CatService from '../services/cat.service';
// import UserModel from '../database/models/UserODM';
// import { User } from '../interfaces';
// import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

export default class CatController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private catService: CatService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.catService = new CatService();
  }
  
  public async getPictureByCode() {
    const { code } = this.req.params;
    const notFound = 'https://www.freepik.com/free-vector/hand-drawn-404-error_1587362.htm#query=404%20cat&position=0&from_view=keyword';
    const cat = await this.catService.getPictureByCode(code);
    console.log('cat:', cat);
    if (!cat) {
      return this.res.status(404).json(notFound);
    } 
      return this.res.status(200).json(cat);
  }
}