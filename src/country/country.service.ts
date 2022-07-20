import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
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
  ): Promise<{ message: string; country1: Country }> {
    const { country } = createCountryDto;
    let country1: Country;
    country1 = await this.countryRepository.findOne({
      where: { country },
    });
    if (country1) {
      return { message: 'country already exists', country1 };
    } else {
      country1 = this.countryRepository.create({
        country,
      });
      await this.countryRepository.save(country1);
      return { message: 'country created successfully', country1 };
    }
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
