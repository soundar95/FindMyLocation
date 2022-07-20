import { State } from 'src/state/entities/state.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'city' })
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  city: string;
  @ManyToOne(() => State, (state) => state.city)
  @JoinColumn({ name: 'state-id', referencedColumnName: 'id' })
  state: State[];
}
