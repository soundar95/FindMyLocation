import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}
  @Get()
  getAllState() {
    return this.stateService.getAllState();
  }
  @Post()
  createCountry(@Query() createStateDto: CreateStateDto) {
    return this.stateService.createState(createStateDto);
  }
  @Get(':id')
  getLocationById(@Param('id') id: string) {
    return this.stateService.getStateById(id);
  }
}
