import { Injectable } from '@nestjs/common';
import { Product, PromotionProduct } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { invalidUUIDException } from 'src/common/exceptions/invalidUUID.exception';
import { ProductNotFoundException } from 'src/common/exceptions/productNotFound.exception';
import { PrismaService } from 'src/database/prisma.service';
import { CreateProductDto } from './dtos/product.dto';
import { CreatePromotionProductDto } from './dtos/promotion-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async findAllPromotionProducts(): Promise<PromotionProduct[]> {
    return this.prismaService.promotionProduct.findMany();
  }

  async findProductById(id: string): Promise<Product | null> {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id }
      });
      if (!product) {
        throw new ProductNotFoundException(`Product with id ${id} not found`);
      }
      return product;
    } catch (err) {
      // if string not uuid format, prisma throws error
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2023'
      ) {
        throw new invalidUUIDException();
      }

      // if product not found, prisma throws error
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new ProductNotFoundException();
      }
      throw err;
    }
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.prismaService.product.create({
      data
    });
  }

  async createPromotionProduct(
    data: CreatePromotionProductDto
  ): Promise<PromotionProduct> {
    return this.prismaService.promotionProduct.create({
      data
    });
  }
}
