import { IsUUID } from 'class-validator';

export class ContractIdParam {
  @IsUUID()
  contractId: string;
}
