import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}
  async getAllState(): Promise<State[]> {
    return this.stateRepository.find();
  }
  async createState(
    createStateDto: CreateStateDto,
  ): Promise<{ message: string; creation1: State }> {
    const { state, country } = createStateDto;
    const creation1 = this.stateRepository.create({
      state,
      country: country as any,
    });
    await this.stateRepository.save(creation1);
    return { message: 'state created successfully', creation1 };
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
