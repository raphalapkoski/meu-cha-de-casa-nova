import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  image: string;
}
