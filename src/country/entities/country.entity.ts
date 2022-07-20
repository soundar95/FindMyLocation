import { State } from 'src/state/entities/state.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'country' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  country: string;
  @OneToMany(() => State, (state) => state.country)
  state: State;
}
