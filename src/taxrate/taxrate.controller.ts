import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxrateService } from './taxrate.service';
import { TaxrateDTO } from './taxrate.dto';

@Controller('taxrates')
export class TaxrateController {
  constructor(private readonly service: TaxrateService) {}
  @Post()
  async addTaxrate(@Body() DTO: TaxrateDTO) {
    const t = await this.service.insertTaxrate(DTO);
    return { data: t };
  }

  @Get()
  async getAllTaxrates() {
    const t = await this.service.getTaxrates();
    return t;
  }
  @Get(':id')
  async getTaxrate(@Param('id') id: string) {
    return this.service.getSingleTaxrate(id);
  }
  @Patch(':id')
  async updateTaxrate(
    @Param('id') id: string,
    @Body('name') n: string,
    @Body('percentage') p: number,
  ) {
    await this.service.updateTaxrate(id, n, p);
    return null;
  }
  @Delete(':id')
  async removeTaxrate(@Param('id') id: string) {
    await this.service.deleteTaxrate(id);
    return null;
  }
}
