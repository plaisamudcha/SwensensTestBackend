import { Injectable } from '@nestjs/common';
import { Product } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { invalidUUIDException } from 'src/common/exceptions/invalidUUID.exception';
import { ProductNotFoundException } from 'src/common/exceptions/productNotFound.exception';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
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
}
