import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from './customers.model';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async insertCostumer(
    _owner: string,
    firstName: string,
    lastName: string,
    street: string,
    number: string,
    zipCode: string,
    city: string,
    companyName: string,
    vatNumber: string,
  ) {
    const c = new this.customerModel({
      _owner,
      firstName,
      lastName,
      street,
      number,
      zipCode,
      city,
      companyName,
      vatNumber,
    });
    const result = await c.save();
    return result as string;
  }

  async getCostumers() {
    const customer = await this.customerModel.find().exec();
    return customer;
  }

  async getSingleCustomer(customerId: string) {
    const customer = await this.findCustomer(customerId);
    return customer;
  }

  async updateCustomer(
    customerId: string,
    firstName: string,
    lastName: string,
    street: string,
    number: string,
    zipCode: string,
    city: string,
    companyName: string,
    vatNumber: string,
  ) {
    const updatedCustomer = await this.findCustomer(customerId);
    if (firstName) {
      updatedCustomer.firstName = firstName;
    }
    if (lastName) {
      updatedCustomer.lastName = lastName;
    }
    if (street) {
      updatedCustomer.street = street;
    }
    if (number) {
      updatedCustomer.number = number;
    }
    if (zipCode) {
      updatedCustomer.zipCode = zipCode;
    }
    if (city) {
      updatedCustomer.city = city;
    }
    if (companyName) {
      updatedCustomer.companyName = companyName;
    }
    if (vatNumber) {
      updatedCustomer.vatNumber = vatNumber;
    }
    updatedCustomer.save();
  }

  async deleteCustomer(customerId: string) {
    const result = await this.customerModel
      .deleteOne({ _id: customerId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find customer.');
    }
  }

  private async findCustomer(id: string) {
    let customer;
    try {
      customer = await this.customerModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find customer.');
    }
    if (!customer) {
      throw new NotFoundException('Could not find customer.');
    }
    return customer;
  }
}
