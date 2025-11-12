import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ThaiBulkSmsConfig } from '../schemas/base.schema';

@Injectable()
export class OtpConfigService {
  constructor(
    private readonly configService: ConfigService<ThaiBulkSmsConfig, true>
  ) {}

  get accessThaiBulkSmsApiKey() {
    return this.configService.get('THAIBULKSMS_API_KEY', { infer: true });
  }

  get accessThaiBulkSmsSecretKey() {
    return this.configService.get('THAIBULKSMS_SECRET_KEY', { infer: true });
  }
}
