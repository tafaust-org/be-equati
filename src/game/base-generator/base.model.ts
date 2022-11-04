import { IGameEntity } from '../../entities/game.entity';

export class BaseModel implements IGameEntity {
  /**
   * The source numbers which are given at the beginning of the game.
   */
  source: number[];
  /**
   * The target number which must be crafted during the game.
   */
  target: number;
}
