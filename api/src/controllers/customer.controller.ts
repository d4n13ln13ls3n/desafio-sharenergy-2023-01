import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { ICustomer } from '../interfaces';
import CustomerService from '../services/customer.service';

export default class CustomerController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CustomerService;
  readonly NOT_FOUND = 'Customer not found';
  readonly INVALID_ID = 'Invalid mongo id';

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CustomerService();
  }

  public async create() {
    const customer: ICustomer = {
      id: this.req.body.id,
      name: this.req.body.name,
      email: this.req.body.email,
      phone: this.req.body.phone,
      address: this.req.body.address,
      cpf: this.req.body.cpf,
    };

    try {
      const newCustomer = await this.service.create(customer);
      return this.res.status(201).json(newCustomer);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    const allCustomers = await this.service.getAll();
    return this.res.status(200).json(allCustomers);
  }
  
  public async getById() {
    try {
      const { id } = this.req.params;
      const customer = await this.service.getById(id);
      if (!customer) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      return this.res.status(200).json(customer);
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }
  
  public async updateCustomer() {
    try {
      const { id } = this.req.params;
      const updatedCustomer = await this.service.updateCustomer(id, this.req.body);
      if (!updatedCustomer) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      return this.res.status(200).json(updatedCustomer);
    } catch (error) {
      return this.res.status(422).json({ message: this.INVALID_ID });
    }
  }

  public async deleteCustomer() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: this.INVALID_ID });
      }
      const deletedCustomer = await this.service.getById(id);
      if (!deletedCustomer) {
        return this.res.status(404).json({ message: this.NOT_FOUND });
      }
      await this.service.deleteCustomer(id);
      return this.res.status(204).end();
    } catch (error) {
      this.next(error);
    }
  }
}