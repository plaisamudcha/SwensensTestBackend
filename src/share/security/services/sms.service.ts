import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { OtpConfigService } from 'src/config/services/otp-config.service';
import { MessageResponse } from 'src/types/response.type';

// type SmsResponse = {
//   remaining_credit: number;
//   total_use_credit: number;
//   credit_type: string;
//   phone_number_list: Array<{
//     number: string;
//     message_id: string;
//     used_credit: number;
//   }>;
//   bad_phone_number_list: string[];
// };

@Injectable()
export class SmsService {
  constructor(private readonly otpConfigService: OtpConfigService) {}

  async sendOtp(
    phoneNumber: string,
    otpCode: string
  ): Promise<MessageResponse> {
    try {
      const params = new URLSearchParams({
        msisdn: phoneNumber,
        message: `Your OTP code is: ${otpCode}`
      });

      await axios.post('https://api-v2.thaibulksms.com/sms', params, {
        auth: {
          username: this.otpConfigService.accessThaiBulkSmsApiKey,
          password: this.otpConfigService.accessThaiBulkSmsSecretKey
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return { message: 'OTP sent successfully' };
    } catch (err) {
      // Log error details
      if (axios.isAxiosError(err)) {
        console.log('Error Response:', err.response?.data);
        console.log('Error Status:', err.response?.status);
        throw new Error(
          `Failed to send OTP: ${JSON.stringify(err.response?.data)}`
        );
      }

      if (err instanceof Error) {
        throw new Error(`Failed to send OTP: ${err.message}`);
      }
      throw new Error('Unknown error occurred while sending OTP');
    }
  }
}
