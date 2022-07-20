import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}
  async getAllCity(): Promise<City[]> {
    return this.cityRepository.find();
  }
  async createCity(
    createCityDto: CreateCityDto,
  ): Promise<{ message: string; creation1: City }> {
    const { city } = createCityDto;
    const creation1 = this.cityRepository.create({
      city,
    });
    await this.cityRepository.save(creation1);
    return { message: 'city created successfully', creation1 };
  }

  async getCityById(id: string): Promise<City | string> {
    const found = await this.cityRepository.findOne({
      where: { id },
    });
    if (!found) {
      return `${id}not found`;
    }
    return found;
  }
}
