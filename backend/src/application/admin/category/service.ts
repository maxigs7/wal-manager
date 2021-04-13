import { PERSISTENCE_CATEGORY_REPOSITORY } from '@constants';
import { ICategoryRepository } from '@domain/interfaces';
import { Injectable, Inject } from '@nestjs/common';
import { CategoryMapper } from './mappers';
import { CategoryDTO, CreateCategoryDTO } from './models';

const CategoryRepo = () => Inject(PERSISTENCE_CATEGORY_REPOSITORY);

@Injectable()
export class CategoryService {
  constructor(@CategoryRepo() private readonly repo: ICategoryRepository) {}

  public async create(dto: CreateCategoryDTO): Promise<string> {
    return this.repo.create(dto.toEntity());
  }

  public async find(): Promise<CategoryDTO[]> {
    const categories = await this.repo.findAll();
    return categories.map((cat) => CategoryMapper.toDTO(cat));
  }
}
