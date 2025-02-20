import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  // 등록
  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.repository.create(dto);

    return await this.repository.save(product);
  }

  // 조회
  async findProductById(id: string): Promise<Product> {
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('제품이 존재하지 않습니다.');
    }

    return product;
  }

  // 제품 수량 감소
  async isProductInStock(id: string, quantity: number): Promise<Product> {
    const product = await this.repository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException('제품이 존재하지 않습니다.');
    }

    product.stock -= quantity;

    // stock이 quantity보다 적거나 재고가 없을 경우 핸들링

    return await this.repository.save(product);
  }
}
