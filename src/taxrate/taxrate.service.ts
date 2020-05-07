import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Taxrate } from './taxrate.model';
import { TaxrateDTO } from './taxrate.dto';
@Injectable()
export class TaxrateService {
  constructor(
    @InjectModel('taxrates') private readonly taxrateModel: Model<Taxrate>,
  ) {}

  /**
   * Inserts a single taxrate into the database
   * @param name The name of the taxrate
   * @param percentage the owner of this product
   */

  async insertTaxrate(taxrateDTO: TaxrateDTO) {
    const { name, percentage } = taxrateDTO;
    const t = new this.taxrateModel({
      name,
      percentage,
    });
    const result = await t.save();
    return result as string;
  }

  async getTaxrates() {
    const t = await this.taxrateModel.find().exec();
    return t;
  }

  async getSingleTaxrate(id: string) {
    const t = await this.findItem(id);
    return t;
  }

  async updateTaxrate(id: string, name: string, percentage: Number) {
    const updatedTaxrate = await this.getSingleTaxrate(id);
    if (name) {
      updatedTaxrate.name = name;
    }
    if (percentage) {
      updatedTaxrate.percentage = percentage;
    }
    updatedTaxrate.save();
  }
  async deleteTaxrate(id: string) {
    const result = await this.taxrateModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Taxrate.');
    }
  }

  private async findItem(id: string) {
    let item;
    try {
      item = await this.taxrateModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find invoice.');
    }
    if (!item) {
      throw new NotFoundException('Could not find invoice.');
    }
    return item;
  }
}
