import { Category, ICategoryRepository } from '@domain/category';
import { Injectable, Inject } from '@nestjs/common';
import { CategoryMapper } from './mappers';
import { CategoryDTO, CreateCategoryDTO } from './models';

const CategoryRepo = () => Inject('CategoryRepo');

@Injectable()
export class CategoryService {
  constructor(@CategoryRepo() private readonly repo: ICategoryRepository) {}

  public async create(dto: CreateCategoryDTO): Promise<string> {
    return this.repo.create(new Category(dto));
  }

  public async find(): Promise<CategoryDTO[]> {
    const categories = await this.repo.find();
    return categories.map((cat) => CategoryMapper.toDTO(cat));
  }
}
