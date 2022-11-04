import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GameEntity } from './game.entity';

export interface ILocationEntity {
  /**
   * Example: Germany
   */
  country: string;
  /**
   * Example: DE
   */
  countryCode: string;
  /**
   * Example: Baden-Württemberg
   */
  regionName: string;
  /**
   * Example: BW
   */
  regionCode: string;
}

@Entity('Location')
export class LocationEntity implements ILocationEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryColumn('text')
  countryCode: string;
  @PrimaryColumn('text')
  regionCode: string;

  @Column('text')
  country: string;
  @Column('text')
  regionName: string;

  @OneToMany(() => GameEntity, (contractEntity) => contractEntity.location)
  contracts: GameEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  public createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  public updatedAt!: Date;
}
