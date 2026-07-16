import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateItemDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  image: string;
}
