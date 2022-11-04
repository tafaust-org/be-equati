import { Injectable } from '@nestjs/common';
import { BaseGeneratorService } from '../base-generator/base-generator.service';
import { randomSubset } from '../../utils/array.utils';
import { SimpleEquationModel } from './simple-equation.model';
import { sampleBoundedRandom } from '../../utils/random.utils';

@Injectable()
export class SimpleEquationGeneratorService
  implements BaseGeneratorService<SimpleEquationModel>
{
  generate() {
    let target: number;
    let possibleSolution: string[];
    const amountOfNumbers = 6;
    const minTargetInclusive = 125;
    const maxTargetExclusive = 1250;
    const operations = ['+', '-', '*', '/'];

    const source: number[] = Array.from(Array(amountOfNumbers), () =>
      sampleBoundedRandom(10),
    );

    do {
      possibleSolution = [];
      const numberOfSamples = sampleBoundedRandom(
        amountOfNumbers,
        sampleBoundedRandom(amountOfNumbers, 2),
      );
      target = randomSubset(source, numberOfSamples).reduce((p, c) => {
        let r: number,
          randomlyCommutatedEquation: string,
          randomlySampledOperation: string;
        do {
          randomlySampledOperation = operations[sampleBoundedRandom(3)];
          randomlyCommutatedEquation =
            Math.random() > 0.5
              ? `${c} ${randomlySampledOperation} ${p}`
              : `${p} ${randomlySampledOperation} ${c}`;
          r = eval(randomlyCommutatedEquation) as number;
          if (r > maxTargetExclusive) return c;
        } while (!Number.isInteger(r) || r <= 0);
        possibleSolution.push(`${randomlyCommutatedEquation} = ${r}`);
        return r;
      });
    } while (source.includes(target) || target < minTargetInclusive);
    const simpleEquationModel = new SimpleEquationModel({
      source,
      target,
      operations,
      possibleSolution,
    });
    return simpleEquationModel;
  }
}
