import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { WebhookPayload, WebhookResponse } from 'src/types';

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  async handleWebhook(payload: WebhookPayload): Promise<WebhookResponse> {
    try {
      const sellerID = payload.seller_id; // Código do vendedor
      const scopeID = payload.scope_id; // Código do produto
      const scope = payload.scope_name + '_' + payload.act;
      let data = {};

      switch (scope) {
        case 'order_insert':
            data = { sellerID, scopeID, event: 'order_insert' };
            break;           
        case 'order_update':
          data = { sellerID, scopeID, event: 'order_update' };
          break;
        case 'order_delete':
          data = { sellerID, scopeID, event: 'order_delete' };
          break;         
        default:
          throw new Error('Unhandled webhook event');
      }

      const webhookUrl = 'WEBHOOK_URL';
      const response = await firstValueFrom(this.httpService.post(webhookUrl, data));

      console.log(response.json());

      return { success: true, message: 'Webhook sent successfully' };
    } catch (error) {
      throw new HttpException(`Failed to handle webhook: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
