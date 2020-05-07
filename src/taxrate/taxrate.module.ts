import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxrateSchema } from './taxrate.model';
import { TaxrateController } from './taxrate.controller';
import { TaxrateService } from './taxrate.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'taxrates', schema: TaxrateSchema }]),
  ],
  controllers: [TaxrateController],
  providers: [TaxrateService],
  exports: [TaxrateService],
})
export class TaxrateModule {}
