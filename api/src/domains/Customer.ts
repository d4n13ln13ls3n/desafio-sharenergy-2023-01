import { ICustomer } from '../interfaces';

export default class Customer {
  protected id: string | undefined;
  protected name: string;
  protected email: string;
  protected phone: string;
  protected address: string;
  protected cpf: string;
  
  constructor(customer: ICustomer) {
    this.id = customer.id;
    this.email = customer.email;
    this.name = customer.name;
    this.phone = customer.phone;
    this.address = customer.address;
    this.cpf = customer.cpf;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public getEmail() {
    return this.email;
  }


  public setPhone(phone: string) {
    this.phone = phone;
  }

  public getPhone() {
    return this.phone;
  }

  public setAddress(address: string) {
    this.address = address;
  }

  public getAddress() {
    return this.address;
  }

  public setCpf(cpf: string) {
    this.cpf = cpf;
  }

  public getCpf() {
    return this.cpf;
  }
}
