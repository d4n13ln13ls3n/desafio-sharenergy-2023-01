import { ICustomer } from '../interfaces';
import CustomerODM from '../models/CustomerODM';
import Customer from '../domains/Customer';

export default class CustomerService {
  private createCustomerDomain(customer: ICustomer): Customer {
    return new Customer(customer);
  }

  public async create(customer: ICustomer) {
    const customerODM = new CustomerODM();
    const newCustomer = await customerODM.create(customer);
    return this.createCustomerDomain(newCustomer);
  }

  public async getAll(): Promise<Customer[]> {
    const customerODM = new CustomerODM();
    const allCustomers = await customerODM.getAll();
    if (allCustomers.length) {
      const result = allCustomers.map((customer) => this.createCustomerDomain(customer));
      return result;
    }
    return [];
  }

  public async getById(id: string): Promise<Customer | null> {
    const customerODM = new CustomerODM();
    const customer = await customerODM.getById(id);
    if (customer) {
      return this.createCustomerDomain(customer);
    }
    return customer;
  }

  public async updateCustomer(id: string, data: ICustomer): Promise<Customer | null> {
    const customerODM = new CustomerODM();
    const updatedCustomer = await customerODM.update(id, data);
    if (updatedCustomer) {
      return this.createCustomerDomain(updatedCustomer);
    }
    return updatedCustomer;
  }

  public async deleteCustomer(id: string) {
    const customerODM = new CustomerODM();
    await customerODM.deleteCustomer(id);
  }
}