import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { SuccessResponse } from 'src/types/response.type';
import { Product } from 'generated/prisma/wasm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<SuccessResponse<Product[]>> {
    const products = await this.productService.findAllProducts();
    return {
      success: true,
      data: products,
      message: 'Products retrieved successfully'
    };
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: string
  ): Promise<SuccessResponse<Product>> {
    const product = (await this.productService.findProductById(id)) as Product;

    return {
      success: true,
      data: product,
      message: 'Product retrieved successfully'
    };
  }
}
