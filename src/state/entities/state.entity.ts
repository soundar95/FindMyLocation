import { City } from 'src/city/entities/city.entity';
import { Country } from 'src/country/entities/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'state' })
export class State {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  state: string;
  @ManyToOne(() => Country, (country) => country.state)
  @JoinColumn({ name: 'country-id', referencedColumnName: 'id' })
  country: Country;

  @OneToMany(() => City, (city) => city.state)
  city: City[];
}
