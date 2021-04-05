import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('/categories')
export class CategoriesController {
  @Get()
  async getAll(): Promise<any> {
    return [{ name: 'cat 1' }];
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<any> {
    return { id: id, name: 'cat 2' };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() category: any) {
    return { ...category };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() category: any) {
    return { id: id, ...category };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return { id: id };
  }
}
