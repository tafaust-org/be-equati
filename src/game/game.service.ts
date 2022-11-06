import { Injectable } from '@nestjs/common';
import { GameEntity } from '../entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimpleEquationModel } from './simple-equation-generator/simple-equation.model';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly gameEntityRepository: Repository<GameEntity>,
  ) {}

  async findAll() {
    return await this.gameEntityRepository.find();
  }

  async findOne(gameId: string) {
    return await this.gameEntityRepository.findOneBy({ gameId });
  }

  async persistSimpleEquationGame(simpleEquationModel: SimpleEquationModel) {
    return await this.gameEntityRepository.save(
      this.gameEntityRepository.create(simpleEquationModel),
    );
  }

  // async update(gameId: string, updateGameDto: UpdateGameDto) {
  //   const gameEntity = await this.gameEntityRepository.findOneBy({
  //     gameId,
  //   });
  //   // we do a save here because of the auto update columns in the entity
  //   return await this.gameEntityRepository.save({
  //     ...gameEntity,
  //     ...updateGameDto,
  //   });
  // }

  // async remove(gameId: string) {
  //   await this.gameEntityRepository.findOneByOrFail({
  //     gameId,
  //   });
  //   return await this.gameEntityRepository.delete({ gameId });
  // }
}
