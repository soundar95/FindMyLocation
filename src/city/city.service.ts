import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from 'src/state/entities/state.entity';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}
  async getAllCity(): Promise<City[]> {
    return this.cityRepository.find();
  }
  async createCity(
    createCityDto: CreateCityDto,
  ): Promise<{ message: string; city1: City }> {
    const { city, state } = createCityDto;
    let city1: City;
    city1 = await this.cityRepository.findOne({
      where: { city },
    });
    if (city1) {
      return { message: 'city already exists', city1 };
    } else {
      const savedState = await this.stateRepository.findOne({
        where: { state },
      });
      if (!savedState) {
        const state1 = this.stateRepository.create({
          state: state,
        });
        await this.stateRepository.save(state1);
      }
      if (savedState) {
        city1 = this.cityRepository.create({
          city,
          state: savedState,
        });
        await this.cityRepository.save(city1);
        return { message: 'city created successfully', city1 };
      }
    }
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
