export class Category {
  constructor(partial: Partial<Category> = {}) {
    Object.assign(this, partial);
  }

  _id: string;
  name: string;
  subcategories: Category[];
  isActive: boolean;
}
