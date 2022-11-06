import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IGameEntity {
  /**
   * The source numbers which are given at the beginning of the game.
   */
  source: number[];
  /**
   * The target number which must be crafted during the game.
   */
  target: number;
  /**
   * An array holding the individual subsequent equations to solve the game.
   */
  possibleSolution: string[];
}

@Entity('Game')
export class GameEntity implements IGameEntity {
  @PrimaryGeneratedColumn('uuid')
  gameId: string;

  @Column('int', { array: true, nullable: false })
  source: number[];
  @Column('int', { nullable: false })
  target: number;
  @Column('text', { array: true, nullable: false })
  possibleSolution: string[];
  @Column('text', { array: true, nullable: false })
  operations: string[];

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
