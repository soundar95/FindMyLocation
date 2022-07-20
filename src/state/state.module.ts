import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State, Country])],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
