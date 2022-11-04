import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';

@Expose({ toClassOnly: true })
class Classes {
  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  '0': number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  '1': number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  '2': number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  '3': number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  '4': number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  '5': number;
}

@Expose({ toClassOnly: true })
export class StatisticsResponseDto {
  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  mean: number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  std: number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  median: number;

  @Expose()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  mad: number;

  @Expose()
  @IsArray({ each: true })
  @IsNumber({ allowNaN: false, allowInfinity: false })
  mode: number[];

  @Expose()
  @ValidateNested()
  @Type(() => Classes)
  classes: Classes;
}
