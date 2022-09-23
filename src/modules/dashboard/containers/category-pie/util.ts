import { getToken, WithCSSVar } from '@chakra-ui/react';
import { Dict } from '@chakra-ui/utils';

import { es } from '@i18n';
import { CategoryTotalItem, TransactionType } from '@models';

import { ICategoryDataset, OTHERS_CATEGORY_ID } from './types';

export const getColor = (colorToken: string, theme: WithCSSVar<Dict<any>>): string =>
  getToken('colors', colorToken)(theme);

export const topParents = (totals: CategoryTotalItem[], maxCategories: number) => {
  const parents = totals.filter((t) => !t.subCategory).sort((a, b) => b.total - a.total);
  const slicedParents =
    parents.length > maxCategories ? parents.slice(0, maxCategories - 1) : parents;
  if (parents.length === slicedParents.length) {
    return slicedParents;
  }

  const othersCategories = parents.filter((p) =>
    slicedParents.every((top) => top.rootCategoryId !== p.rootCategoryId),
  );

  return [
    ...slicedParents,
    othersCategories.reduce((other: CategoryTotalItem, cat: CategoryTotalItem) => {
      if (other.rootCategoryId === cat.rootCategoryId) {
        return {
          ...other,
          rootCategoryId: OTHERS_CATEGORY_ID,
          rootCategory: es.category.others,
        };
      }

      other.total += cat.total;
      return other;
    }, othersCategories[0]),
  ];
};

const buildSubDataset = (categories: CategoryTotalItem[], rootId: string, rootColor: string) =>
  categories
    .filter((child) => child.rootCategoryId === rootId)
    .map((child) => {
      return {
        amount: child.amount,
        color: rootColor,
        id: child.subCategoryId ?? rootId + OTHERS_CATEGORY_ID,
        label: child.subCategory ?? es.category.others,
      };
    });

export const buildDatasetByType = (
  categories: CategoryTotalItem[],
  type: TransactionType,
  theme: WithCSSVar<Dict<any>>,
  maxCategories: number,
) => {
  const categoriesType = categories.filter((t) => t.type === type);
  const parents = topParents(categoriesType, maxCategories);

  // Main Dataset
  const dataset: ICategoryDataset[] = parents.map((parent) => {
    const color = getColor(parent.rootCategoryColor, theme);
    let children: ICategoryDataset[] = [];
    if (parent.rootCategoryId === OTHERS_CATEGORY_ID) {
      children = categoriesType
        .filter(
          (cat) =>
            parents.every((top) => top.rootCategoryId !== cat.rootCategoryId) && !cat.subCategoryId,
        )
        .map((cat) => {
          const rootColor = getColor(cat.rootCategoryColor, theme);
          return {
            amount: cat.total,
            color: rootColor,
            children: buildSubDataset(categoriesType, cat.rootCategoryId, rootColor),
            id: cat.rootCategoryId,
            label: cat.rootCategory,
          };
        });
    } else {
      children = buildSubDataset(categoriesType, parent.rootCategoryId, color);
    }

    return {
      amount: parent.total,
      color: color,
      children: children,
      id: parent.rootCategoryId,
      label: parent.rootCategory,
    };
  });

  return dataset;
};

export const buildPieDataset = (dataset: ICategoryDataset[], subsetActive: string[]) => {
  const buildSubDataset = (
    subset: any[],
    parent: ICategoryDataset,
    _pIx: number,
    parents: ICategoryDataset[],
  ): any[] => {
    if (!parent.children || !parent.children.length) return subset;

    const hasAnotherLevel = parent.children.some((child) => child.children);

    const hidden = !subsetActive.length ? true : !subsetActive.includes(parent.id);
    debugger;
    return [
      ...subset,
      {
        id: parent.id,
        label: parent.label,
        data: parent.children,
        backgroundColor: parent.children.map((t) => t.color),
        hidden: hidden,
      },
      ...(hasAnotherLevel ? parent.children.reduce(buildSubDataset, []) : []),
    ];
  };

  return [
    {
      id: 'parent',
      label: 'parents',
      data: dataset,
      backgroundColor: dataset.map((t) => t.color),
    },
    ...dataset.reduce(buildSubDataset, []),
  ];
};
