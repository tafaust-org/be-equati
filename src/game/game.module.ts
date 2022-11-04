import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameEntity } from '../entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimpleEquationGeneratorService } from './simple-equation-generator/simple-equation-generator.service';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  controllers: [GameController],
  providers: [GameService, SimpleEquationGeneratorService],
})
export class GameModule {}
