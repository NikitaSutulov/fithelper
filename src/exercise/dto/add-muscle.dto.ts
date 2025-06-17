import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddMuscleDto {
  @IsUUID()
  @IsNotEmpty()
  muscleId: string;
}
