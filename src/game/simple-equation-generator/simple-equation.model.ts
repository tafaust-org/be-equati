import { BaseModel } from '../base-generator/base.model';

export type SimpleEquationConfig = {
  source: number[];
  target: number;
  operations: string[];
  possibleSolution: string[];
};

export class SimpleEquationModel implements BaseModel {
  source: number[];
  target: number;
  operations: string[];
  possibleSolution: string[];

  constructor(config: SimpleEquationConfig) {
    this.source = config.source;
    this.target = config.target;
    this.operations = config.operations;
    this.possibleSolution = config.possibleSolution;
  }
}
