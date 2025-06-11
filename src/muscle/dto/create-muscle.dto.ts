import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateMuscleDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
