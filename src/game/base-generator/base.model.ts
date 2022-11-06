import { IGameEntity } from '../../entities/game.entity';

export class BaseModel implements IGameEntity {
  source: number[];
  target: number;
  possibleSolution: string[];
}
