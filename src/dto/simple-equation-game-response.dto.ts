import { SimpleEquationModel } from '../game/simple-equation-generator/simple-equation.model';

export class SimpleEquationGameResponseDto implements SimpleEquationModel {
  operations: string[];
  possibleSolution: string[];
  source: number[];
  target: number;
}
