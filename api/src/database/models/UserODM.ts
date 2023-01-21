import { Schema, isValidObjectId } from 'mongoose';
import { CreateUserRequestBody, IUser } from '../../interfaces';
import AbstractODM from './AbstractODM';

class UserODM extends AbstractODM<CreateUserRequestBody> {
  constructor() {
    const schema = new Schema<CreateUserRequestBody>({
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avatar: { type: String, required: true },
      fullname: { type: String, required: true },
      age: { type: String, required: true },
    });
    super(schema, 'User');
  }

  public async getAll(): Promise<CreateUserRequestBody[]> {
    return this.model.find({});
  }

  public async getById(id: string): Promise<CreateUserRequestBody | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    return this.model.findById({ _id: id });
  }

  public async getByUsername(username: string): Promise<IUser | null> {
    // if (!isValidObjectId(id)) {
    //   throw new Error('Invalid mongo id');
    // }
    return this.model.findOne({ username });
  }

  public async deleteUser(id: string) {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    return this.model.findByIdAndDelete({ _id: id });
  }
}

export default UserODM;

function id(id: any) {
  throw new Error('Function not implemented.');
}
