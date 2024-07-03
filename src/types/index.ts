export interface WebhookPayload {
    seller_id: string;
    scope_name: string;
    act: string;
    scope_id: string;
  }
  
  export interface WebhookResponse {
    success: boolean;
    message?: string;
  }
  