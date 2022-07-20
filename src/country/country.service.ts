import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getAllCountry(): Promise<Country[]> {
    return this.countryRepository.find();
  }
  async createCountry(
    createCountryDto: CreateCountryDto,
  ): Promise<{ message: string; creation1: Country }> {
    const { country } = createCountryDto;
    const creation1 = this.countryRepository.create({
      country,
    });
    await this.countryRepository.save(creation1);
    return { message: 'country created successfully', creation1 };
  }
  async getCountryById(id: string): Promise<Country | string> {
    const found = await this.countryRepository.findOne({
      where: { id },
    });
    if (!found) {
      return `${id}not found`;
    }
    return found;
  }
}
