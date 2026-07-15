import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsNotEmpty()
  image: string;
}
