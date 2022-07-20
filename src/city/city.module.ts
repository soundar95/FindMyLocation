import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from 'src/state/entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, State])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
