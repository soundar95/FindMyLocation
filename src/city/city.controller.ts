import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}
  @Get()
  getAllState() {
    return this.cityService.getAllCity();
  }
  @Post()
  createCity(@Query() createCityDto: CreateCityDto) {
    return this.cityService.createCity(createCityDto);
  }
  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return this.cityService.getCityById(id);
  }
}
