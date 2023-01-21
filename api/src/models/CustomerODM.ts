import { Schema, isValidObjectId } from 'mongoose';
import { ICustomer } from '../interfaces';
import AbstractODM from './AbstractODM';

export default class CustomerODM extends AbstractODM<ICustomer> {
  constructor() {
    const schema = new Schema<ICustomer>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      cpf: { type: String, required: true },
    });
    super(schema, 'Customer');
  }

  public async getAll(): Promise<ICustomer[]> {
    return this.model.find({});
  }
  
  public async getById(id: string): Promise<ICustomer | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    return this.model.findById({ _id: id });
  }

  public async deleteCustomer(id: string) {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    return this.model.findByIdAndDelete({ _id: id });
  }
}