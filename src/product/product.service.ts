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
}
