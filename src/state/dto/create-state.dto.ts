import { IsNotEmpty } from 'class-validator';

export class CreateStateDto {
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  country: string;
}
