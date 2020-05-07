import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { InvoiceModule } from './invoices/invoice.module';
import { LoggerModule } from './logger/logger.module';
import { TaxrateModule } from './taxrate/taxrate.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LoggerModule,
    ProductsModule,
    CustomersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/billing'),
    TaxrateModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
