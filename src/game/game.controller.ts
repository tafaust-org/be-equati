import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SimpleEquationGameResponseDto } from '../dto/simple-equation-game-response.dto';
import { plainToInstance } from 'class-transformer';
import { SimpleEquationGeneratorService } from './simple-equation-generator/simple-equation-generator.service';
import { GameEntity } from '../entities/game.entity';

@ApiSecurity('api-key')
@ApiTags('game')
@ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Invalid API Key' })
@Controller({ path: 'game', version: '1' })
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly simpleEquationGeneratorService: SimpleEquationGeneratorService,
  ) {}

  /**
   * Fetch a game given its id.
   * @param gameId
   */
  @ApiOperation({ summary: 'Fetch all simple equation game.' })
  @Get('simple')
  async getAllSimpleEquationGame(): Promise<GameEntity[] | null> {
    // todo pagination
    return await this.gameService.findAll();
  }

  /**
   * Fetch a game given its id.
   * @param gameId
   */
  @ApiOperation({
    summary: 'Fetch a specific simple equation game given its id.',
  })
  @Get('simple/:gameId')
  async getSimpleEquationGame(
    @Param('gameId') gameId: string,
  ): Promise<GameEntity | null> {
    return await this.gameService.findOne(gameId);
  }

  /**
   * Create a new simple equation game.
   */
  @ApiOperation({ summary: 'Create a new simple equation game.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Resource created',
    type: SimpleEquationGameResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @Post('simple')
  async createSimpleEquationGame(): Promise<SimpleEquationGameResponseDto> {
    Logger.debug('Creating a new simple equation game.');
    const simpleEquationGame = this.simpleEquationGeneratorService.generate();
    const result = await this.gameService.persistSimpleEquationGame(
      simpleEquationGame,
    );
    return plainToInstance(SimpleEquationGameResponseDto, result);
  }

  /**
   * Update an existing contract by id.
   */
  // @ApiOperation({ summary: 'Update an existing contract by id.' })
  // @ApiBody({
  //   type: UpdateGameDto,
  //   description: 'Update an existing contract in the store.',
  //   required: true,
  //   examples: {
  //     a: {},
  //   },
  // })
  // @ApiParam({
  //   name: 'contractId',
  //   description: 'The globally unique id of the contract to update.',
  //   allowEmptyValue: false,
  //   required: true,
  //   type: String,
  //   format: 'uuid',
  // })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Successful operation',
  //   type: SimpleEquationGameResponseDto,
  // })
  // @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  // @ApiResponse({
  //   status: HttpStatus.INTERNAL_SERVER_ERROR,
  //   description: 'Failed to update resource',
  // })
  // @Put(':contractId')
  // async update(
  //   @Param() params: ContractIdParam,
  //   @Body() updateContractDto: UpdateGameDto,
  //   @Res() res: Response,
  // ): Promise<SimpleEquationGameResponseDto | void> {
  //   const { contractId } = params;
  //   Logger.debug('Updating an existing contract.');
  //   Logger.verbose(`Received: ${JSON.stringify(updateContractDto)}`);
  //   try {
  //     const updatedContract = await this.gameService.update(
  //       contractId,
  //       updateContractDto,
  //     );
  //     res.status(HttpStatus.OK);
  //     res.json(plainToInstance(SimpleEquationGameResponseDto, updatedContract));
  //   } catch (e) {
  //     Logger.error(`Failed to update contract with id ${contractId}.`);
  //     Logger.error(e);
  //     res
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .send(`Failed to update contract with id '${contractId}'.`);
  //   }
  // }

  /**
   * Delete an existing contract by id.
   * @param params {ContractIdParam}
   * @param res
   */
  //   @ApiOperation({ summary: 'Delete an existing contract by id.' })
  //   @ApiParam({
  //     name: 'contractId',
  //     description: 'The globally unique id of the contract to delete.',
  //     allowEmptyValue: false,
  //     required: true,
  //     type: String,
  //     format: 'uuid',
  //   })
  //   @ApiResponse({
  //     status: HttpStatus.OK,
  //     description: 'Successful operation',
  //     type: SimpleEquationGameResponseDto,
  //   })
  //   @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  //   @ApiResponse({
  //     status: HttpStatus.NOT_FOUND,
  //     description: 'Resource to delete was not found',
  //   })
  //   @Delete(':contractId')
  //   async remove(@Param() params: ContractIdParam, @Res() res: Response) {
  //     const { contractId } = params;
  //     Logger.debug('Deleting an existing contract.');
  //     Logger.verbose(`Received contract id: ${contractId}`);
  //     try {
  //       await this.gameService.remove(contractId);
  //       res.status(HttpStatus.OK).send(`Contract deleted.`);
  //     } catch (e) {
  //       res.status(HttpStatus.NOT_FOUND).send(`No contract found.`);
  //     }
  //   }
}
