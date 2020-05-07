import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CustomerController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { CustomerSchema } from "./customers.model";


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Customer', schema: CustomerSchema }])
  ],
  controllers: [CustomerController],
  providers: [CustomersService],
})
export class CustomersModule {}