// product.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProductsService {
    constructor(private readonly httpService: HttpService) {}


    async findAll(params): Promise<any> {
        const { access_token, ...queryParams } = params;

        const TRAY_API_URL = "";
        const TRAY_API_TOKEN = "";

        try {
            const response = this.httpService.get(`https://${TRAY_API_URL}/products?access_token=${TRAY_API_TOKEN}`, {
                params: {
                    access_token,
                    ...queryParams,
                },
            });

            return response;
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                throw new HttpException(data, status);
            } else {
                throw new HttpException('Failed to fetch products', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
