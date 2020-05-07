import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDTO } from './invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post()
  async addInvoice(@Body() invoiceDTO: InvoiceDTO) {
    const i = await this.service.insertInvoice(invoiceDTO);
    return { data: i };
  }

  @Get()
  async getAllInvoices() {
    const i = await this.service.getInvoices();
    return { data: i };
  }

  @Get(':id')
  async getInvoice(@Param('id') id: string) {
    return { data: this.service.getSingleInvoice(id) };
  }

  @Patch(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body('first_name') c_first_name: string,
    @Body('last_name') c_last_name: string,
    @Body('street') c_street: string,
    @Body('number') c_number: number,
    @Body('zip_code') c_zip_code: string,
    @Body('city') c_city: string,
    @Body('company_name') c_company_name: string,
    @Body('vat_number') c_vat_number: string,
  ) {
    await this.service.updateInvoice(
      id,
      c_first_name,
      c_last_name,
      c_street,
      c_number,
      c_zip_code,
      c_city,
      c_company_name,
      c_vat_number,
    );
    return null;
  }

  @Delete(':id')
  async removeInvoice(@Param('id') id: string) {
    await this.service.deleteInvoice(id);
    return null;
  }
}
