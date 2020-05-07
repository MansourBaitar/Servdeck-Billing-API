import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './products.model';
import { ProductsDTO } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  /**
   * Inserts a single product into the database
   * @param title The name of the product
   * @param owner the owner of this product
   * @param description Short description about the product
   * @Param price The price of the product
   */
  async insertProduct(productsDTo: ProductsDTO) {
    const { title, owner, description, price } = productsDTo;

    const p = new this.productModel({
      title,
      owner,
      description,
      price,
    });
    const result = await p.save();
    return result as string;
  }

  /**
   * Retrieves all products from the database
   */
  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      owner: prod.owner,
      description: prod.description,
      price: prod.price,
    }));
  }

  /**
   * Retrieves a single product with the exact id from the database
   * @param id The id of the product
   */
  async getSingleProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      owner: product.owner,
      description: product.description,
      price: product.price,
    };
  }

  /**
   * Updates a single product from the database.
   * @param id The id of the product
   * @param title The title you wish to assign
   * @param description the new description you wish to set
   */
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  /**
   * Removes a single product from the database
   * @param id The id of the product
   */
  async deleteProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    if (product) {
      const result = await this.productModel.deleteOne({ _id: prodId }).exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find product.');
      } else {
        return product;
      }
    }
  }

  private async findProduct(id: string) {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.' + error);
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
