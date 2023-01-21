export interface AuthenticationCredentials {
  username: string;
  password: string;
}

export interface CreateUserRequestBody {
  username: string;
  email: string;
  password: string;
  avatar: string;
  fullname: string;
  age: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string;
  fullname: string;
  age: string;
}

export interface User {
  avatar: string;
  fullname: string;
  email: string;
  username: string;
  age: string;
}

export interface JWTPayload {
  id: number;
  username: string;
}

export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
}
