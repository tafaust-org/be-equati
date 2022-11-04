import { ContractTypeEnum } from '../enums/contract-type.enum';
import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

export class StatisticsParam {
  @IsDefined()
  @IsEnum(ContractTypeEnum)
  contractType: ContractTypeEnum;

  @IsDefined()
  @IsString()
  countryCode: string;

  @IsOptional()
  @IsString()
  regionCode?: string;
}
