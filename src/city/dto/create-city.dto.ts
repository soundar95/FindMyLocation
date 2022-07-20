import { IsNotEmpty } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  state: string;
}
