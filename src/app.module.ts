import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { Country } from './country/entities/country.entity';
import { State } from './state/entities/state.entity';
import { City } from './city/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@Postgres123',
      database: 'locations-new',
      synchronize: true,
      logging: true,
      entities: [Country, State, City],
      subscribers: [],
    }),
    CountryModule,
    StateModule,
    CityModule,
  ],
})
export class AppModule {}
