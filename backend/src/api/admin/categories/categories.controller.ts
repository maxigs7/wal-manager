import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateCategoryDTO,
  CategoryService,
  UpdateCategoryDTO,
  CategoryDTO,
} from '@application/admin/category';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/categories')
@ApiBearerAuth('access-token')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  constructor(private service: CategoryService) {}

  @Get()
  async getAll(): Promise<CategoryDTO[]> {
    return this.service.find();
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<any> {
    return { id: id, name: 'cat 2' };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCategoryDTO): Promise<string> {
    return this.service.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() category: UpdateCategoryDTO) {
    return { id: id, ...category };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return { id: id };
  }
}
