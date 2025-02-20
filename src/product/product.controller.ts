import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

const GET_PRODUCT = 'get_product';
const IS_PRODUCT_IN_STOCK = 'is_product_in_stock';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: '제품 등록' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(dto);
  }

  // 제품 정보 보내는 핸들러
  @MessagePattern(GET_PRODUCT)
  async getProductHandler(
    @Payload() data: { productId: string },
  ): Promise<Product> {
    const { productId } = data;

    return await this.productService.findProductById(productId);
  }

  // 제품 수량 줄이는 핸들러
  @MessagePattern(IS_PRODUCT_IN_STOCK)
  async isProductInStockHandler(
    @Payload() data: { productId: string; quantity: number },
  ): Promise<Product> {
    const { productId, quantity } = data;

    return await this.productService.isProductInStock(productId, quantity);
  }

  // @Get('/:id')
  // @ApiOperation({ summary: '제품 조회' })
  // async findProductById(@Param('id') id: string): Promise<Product> {
  //   return await this.productService.findProductById(id);
  // }
}
