import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}
  async getAllState(): Promise<State[]> {
    return this.stateRepository.find();
  }
  async createState(
    createStateDto: CreateStateDto,
  ): Promise<{ message: string; state1: State }> {
    const { state, country } = createStateDto;
    let state1: State;
    state1 = await this.stateRepository.findOne({
      where: { state },
    });
    if (state1) {
      return { message: 'state already exists', state1 };
    } else {
      const savedcountry = await this.countryRepository.findOne({
        where: { country },
      });
      if (!savedcountry) {
        const country1 = this.countryRepository.create({
          country,
        });
        await this.countryRepository.save(country1);
      }
      if (savedcountry) {
        state1 = this.stateRepository.create({
          state,
          country: savedcountry,
        });
        await this.stateRepository.save(state1);
        return { message: 'state created successfully', state1 };
      }
    }
  }

  async getStateById(id: string): Promise<State | string> {
    const found = await this.stateRepository.findOne({
      where: { id },
    });
    if (!found) {
      return `${id}not found`;
    }
    return found;
  }
}
