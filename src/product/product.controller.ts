import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { SuccessResponse } from 'src/types/response.type';
import { Product, PromotionProduct } from 'generated/prisma/wasm';
import { CreateProductDto } from './dtos/product.dto';
import { CreatePromotionProductDto } from './dtos/promotion-product.dto';

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

  @Get('promotion')
  async getAllPromotionProducts(): Promise<
    SuccessResponse<PromotionProduct[]>
  > {
    const promotionProducts =
      await this.productService.findAllPromotionProducts();
    return {
      success: true,
      data: promotionProducts,
      message: 'Promotion products retrieved successfully'
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

  @Post()
  async createProduct(
    @Body() body: CreateProductDto
  ): Promise<SuccessResponse<Product>> {
    const product = await this.productService.createProduct(body);
    return {
      success: true,
      data: product,
      message: 'Product created successfully'
    };
  }

  @Post('promotion')
  async createPromotionProduct(
    @Body() body: CreatePromotionProductDto
  ): Promise<SuccessResponse<PromotionProduct>> {
    const promotionProduct =
      await this.productService.createPromotionProduct(body);
    return {
      success: true,
      data: promotionProduct,
      message: 'Promotion product created successfully'
    };
  }
}
