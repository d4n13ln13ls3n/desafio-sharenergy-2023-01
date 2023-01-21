import { Schema, isValidObjectId } from 'mongoose';
import { User } from '../interfaces';
import AbstractODM from './AbstractODM';

class UserODM extends AbstractODM<User> {
  constructor() {
    const schema = new Schema<User>({
      avatar: { type: String, required: true },
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      username: { type: String, required: true },
      age: { type: String, required: true },
    });
    super(schema, 'User');
  }

  public async getAll(): Promise<User[]> {
    return this.model.find({});
  }

  public async save(list: User[]) {
    return this.model.insertMany({ list }, { ordered: false });
  }

  // public async getById(id: string): Promise<User | null> {
  //   if (!isValidObjectId(id)) {
  //     throw new Error('Invalid mongo id');
  //   }
  //   return this.model.findById({ _id: id });
  // }

  // public async deleteUser(id: string) {
  //   if (!isValidObjectId(id)) {
  //     throw new Error('Invalid mongo id');
  //   }
  //   return this.model.findByIdAndDelete({ _id: id });
  // }
}

export default UserODM;
