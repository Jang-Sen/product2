import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: '제품 등록' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(dto);
  }

  @Get('/:id')
  @ApiOperation({ summary: '제품 조회' })
  async findProductById(@Param('id') id: string): Promise<Product> {
    return await this.productService.findProductById(id);
  }
}
