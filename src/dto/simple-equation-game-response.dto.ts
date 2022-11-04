import { IGameEntity } from '../entities/game.entity';
import { CurrencyEnum } from '../enums/currency.enum';
import { UnitEnum } from '../enums/unit.enum';
import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { Expose, Transform, Type } from 'class-transformer';
import { LocationResponseDto } from './location-response.dto';
import { ContractTypeEnum } from '../enums/contract-type.enum';

@Expose({ toClassOnly: true })
export class SimpleEquationGameResponseDto
  implements Omit<IGameEntity, 'termEnd'>
{
  @Expose()
  @IsUUID()
  contractId: string;

  @Expose()
  @IsEnum(ContractTypeEnum)
  contractType: ContractTypeEnum;

  @Expose()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;

  @Expose()
  @IsEnum(UnitEnum)
  unit: UnitEnum;

  @Expose()
  @Type(() => LocationResponseDto)
  location: LocationResponseDto;

  @Expose()
  @IsNumber()
  @Min(0)
  priceInCents: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value?.getTime(), { toClassOnly: true })
  termEnd?: number;
}
