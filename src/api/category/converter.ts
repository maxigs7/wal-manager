import { Category, CategoryLookup } from '@models';

export const convertToCategoryLookup = (root: Category, sub?: Category): CategoryLookup => ({
  rootName: root.name,
  color: root.color,
  icon: root.icon,
  id: sub?.id || root.id,
  subName: sub?.name,
});

export const convertToCategoryLookupArray = (categories: Category[]): CategoryLookup[] =>
  categories
    .filter((category) => !category.parentId)
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    .reduce((accum: CategoryLookup[], root: Category) => {
      const rootLookup = convertToCategoryLookup(root);
      const children = categories
        .filter((category) => category.parentId === root.id)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        .map((sub) => convertToCategoryLookup(root, sub));

      return [...accum, rootLookup, ...children];
    }, [] as CategoryLookup[]);
