import { PartialType } from '@nestjs/swagger';
import { CreateSimpleEquationGameDto } from './create-simple-equation-game.dto';

export class UpdateGameDto extends PartialType(CreateSimpleEquationGameDto) {}
