import { User } from '../interfaces';
import UserModel from '../models/UserODM';
import UserDomain from '../domains/User';
import axios from 'axios';


export default class UserService {
  
  private createUserDomain(user: User): UserDomain {
    return new UserDomain(user);
  }
  private userModel: UserModel = new UserModel();

  getRandomUser = async () => {
    const result = await axios.get('https://randomuser.me/api/');
    const randomUser = result.data;
    // console.log('allUsers no service:', randomUser);
    const userInfo = {
      avatar: randomUser.results[0].picture.thumbnail,
      fullname: `${randomUser.results[0].name.first} ${randomUser.results[0].name.last}`,
      email: randomUser.results[0].email,
      username: randomUser.results[0].login.username,
      age: randomUser.results[0].dob.age,
    };
    // console.log('user info:', userInfo);
    return userInfo;
  }

  async saveList(userList: User[]) {
    const userModel = new UserModel();
    const savedList = await this.userModel.save(userList);
    return savedList;
  }

  makeUserList = async () => {
    const userList = [];
    for (let i = 0; i <= 10; i += 1) {
      const newUser = await this.getRandomUser();
      userList.push(newUser);
    }
    // console.log('user list:', userList);
    this.saveList(userList);
    return userList;
  }
  
  // public async getAll(): Promise<UserDomain[]> {
  //   const userODM = new UserODM();
  //   const allUsers = await userODM.getAll();
  //   // console.log('allUsers no service:', allUsers);
  //   if (allUsers.length) {
  //     const result = allUsers.map((user) => this.createUserDomain(user));
  //     return result;
  //   }
  //   return [];
  // }
  
  // async create({ password, ...rest }: CreateUserDTO) {
  //   const salt = genSaltSync(10);
  //   const user = {
  //     ...rest,
  //     password: hashSync(password, salt)
  //   }
  //   await this.userModel.save(user);
  //   return user;
  // }

}
