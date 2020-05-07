import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async addCostumer(
    @Body('_owner') owner: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('street') street: string,
    @Body('number') number: string,
    @Body('zipCode') zipCode: string,
    @Body('city') city: string,
    @Body('companyName') companyName: string,
    @Body('vatNumber') vatNumber: string,
  ) {
    const c = await this.customersService.insertCostumer(
      owner,
      firstName,
      lastName,
      street,
      number,
      zipCode,
      city,
      companyName,
      vatNumber,
    );
    return { data: c };
  }
  @Get()
  async getAllCostumers() {
    const c = await this.customersService.getCostumers();
    return c;
  }

  @Get(':id')
  getCustomer(@Param('id') custId: string) {
    return this.customersService.getSingleCustomer(custId);
  }

  @Patch(':id')
  async updateCustomer(
    @Param('id') custId: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('street') street: string,
    @Body('number') number: string,
    @Body('zipCode') zipCode: string,
    @Body('city') city: string,
    @Body('companyName') companyName: string,
    @Body('vatNumber') vatNumber: string,
  ) {
    await this.customersService.updateCustomer(
      custId,
      firstName,
      lastName,
      street,
      number,
      zipCode,
      city,
      companyName,
      vatNumber,
    );
    return null;
  }

  @Delete(':id')
  async removeCustomer(@Param('id') custId: string) {
    await this.customersService.deleteCustomer(custId);
    return null;
  }
}
