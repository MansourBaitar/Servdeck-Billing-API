import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceSchema } from './invoice.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'invoices', schema: InvoiceSchema }]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
