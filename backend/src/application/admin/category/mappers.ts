import { Category } from '@domain/models';
import { CategoryDTO, CreateCategoryDTO } from './models';

export class CategoryMapper {
  static toDTO(entity: Category): CategoryDTO {
    return {
      id: entity._id,
      name: entity.name,
      isActive: entity.isActive,
      subCategories: [],
    };
  }

  toSubcategoryDTO() {}
}
