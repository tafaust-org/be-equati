import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] ?? req.query.api_key; // checks the header, moves to query if null
    let apiKey = this.configService.get<string>('API_KEY_FILE');
    if (apiKey !== undefined) {
      apiKey = fs.readFileSync(apiKey).toString('utf8');
    } else {
      apiKey = this.configService.get<string>('API_KEY');
    }
    if (apiKey === undefined) {
      throw new InternalServerErrorException(
        'Cannot guard endpoints! Did you forget to add the secret to the deployment? Please add the `API_KEY` or' +
          ' `API_KEY_FILE`' +
          ' secret!',
      );
    }
    return apiKey === key;
  }
}
