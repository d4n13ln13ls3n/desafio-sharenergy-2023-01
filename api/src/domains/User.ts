import { User } from '../interfaces';

class UserDomain {
  // protected id: string | undefined;
  protected avatar: string;
  protected fullname: string;
  protected email: string;
  protected username: string;
  protected age: string;
  
  constructor(user: User) {
    // this.id = user.id;
    this.avatar = user.avatar;
    this.fullname = user.fullname;
    this.email = user.email;
    this.username = user.username;
    this.age = user.age;
  }

  // public setId(id: string) {
  //   this.id = id;
  // }

  // public getId() {
  //   return this.id;
  // }

  public setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  public getAvatar() {
    return this.avatar;
  }

  public setFullname(fullname: string) {
    this.fullname = fullname;
  }

  public getFullname() {
    return this.fullname;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail() {
    return this.email;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public getUsername() {
    return this.username;
  }

  public setAge(age: string) {
    this.age = age;
  }

  public getAge() {
    return this.age;
  }
}

export default UserDomain;