import { BaseModel } from './base.model';

export interface BaseGeneratorService<T extends BaseModel> {
  generate(): T;
}
