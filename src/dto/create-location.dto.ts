import { ILocationEntity } from '../entities/location.entity';
import { IsString } from 'class-validator';

export class CreateLocationDto implements ILocationEntity {
  @IsString()
  country: string;
  @IsString()
  countryCode: string;
  @IsString()
  regionCode: string;
  @IsString()
  regionName: string;
}
