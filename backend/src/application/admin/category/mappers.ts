import { Category } from '@domain/category';
import { CategoryDTO } from './models';

export class CategoryMapper {
  static toDTO(entity: Category): CategoryDTO {
    return {
      id: entity._id,
      name: entity.name,
      isActive: entity.isActive,
      subcategories: (entity.subcategories || []).map((cat) =>
        CategoryMapper.toDTO(cat),
      ),
    };
  }
}
