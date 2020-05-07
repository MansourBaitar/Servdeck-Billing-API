import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Invoice } from './invoice.model';
import { InvoiceDTO } from './invoice.dto';
import { TaxrateService } from 'src/taxrate/taxrate.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel('invoices') private readonly invoiceModel: Model<Invoice>,
  ) {}

  /**
   * Inserts a single product into the database
   * @param owner The name of the product
   * @param customer the owner of this product
   * @param description Short description about the product
   * @Param products The price of the product
   */
  async insertInvoice(invoiceDTO: InvoiceDTO) {
    const { owner, customer, description, products, taxrateId } = invoiceDTO;
    const i = new this.invoiceModel({
      owner,
      customer,
      description,
      products,
      taxrateId,
    });
    const result = await i.save();
    return result as string;
  }

  async getInvoices() {
    const i = await this.invoiceModel.find().exec();
    return i;
  }

  async getSingleInvoice(id: string) {
    const i = await this.findItem(id);
    return i;
  }

  async updateInvoice(
    Id: string,
    first_name: string,
    last_name: string,
    street: string,
    number: number,
    zip_code: string,
    city: string,
    company_name: string,
    vat_number: string,
  ) {
    const updatedInvoice = await this.findItem(Id);
    if (first_name) {
      updatedInvoice.first_name = first_name;
    }
    if (last_name) {
      updatedInvoice.last_name = last_name;
    }
    if (street) {
      updatedInvoice.street = street;
    }
    if (number) {
      updatedInvoice.number = number;
    }
    if (zip_code) {
      updatedInvoice.zip_code = zip_code;
    }
    if (city) {
      updatedInvoice.city = city;
    }
    if (company_name) {
      updatedInvoice.company_name = company_name;
    }
    if (vat_number) {
      updatedInvoice.vat_number = vat_number;
    }
    updatedInvoice.save();
  }

  async deleteInvoice(id: string) {
    const result = await this.invoiceModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find invoice.');
    }
  }

  private async findItem(id: string) {
    let item;
    try {
      item = await this.invoiceModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find invoice.');
    }
    if (!item) {
      throw new NotFoundException('Could not find invoice.');
    }
    return item;
  }
}
