import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IGameEntity {
  source: number[];
  target: number;
}

@Entity('Contract')
export class GameEntity implements IGameEntity {
  @PrimaryGeneratedColumn('uuid')
  gameId: string;

  @Column('int', { array: true, nullable: false })
  source: number[];
  @Column('int', { nullable: false })
  target: number;

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
