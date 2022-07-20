import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}
  @Get()
  getAllCountry() {
    return this.countryService.getAllCountry();
  }
  @Post()
  createCountry(@Query() createCountryDto: CreateCountryDto) {
    return this.countryService.createCountry(createCountryDto);
  }
  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return this.countryService.getCountryById(id);
  }
}
