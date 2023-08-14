const translations = {
  table: {
    headers: {
      color: 'Color',
      icon: 'Icono',
      name: 'Nombre',
    },
  },
  form: {
    color: 'Color',
    colorPlaceholder: 'Seleccione un color',
    icon: 'Icono',
    iconPlaceholder: 'Seleccione un icono',
    name: 'Nombre',
    namePlaceholder: 'Ingrese el nombre de la categoría',
    parentId: 'Nueva categoría padre',
    parentIdPlaceholder: 'Seleccione una categoría',
  },
  iconNotFound: 'El icono no se encuentra, por favor modifique la categoria',
  others: 'Otros',
  pages: {
    create: {
      metaTitle: 'Nueva Categoría',
      title: 'Nueva Categoría',
    },
    index: {
      metaTitle: 'Mis Categorías',
      title: 'Mis Categorías',
    },
    move: {
      breadcrumb: 'Mover',
      metaTitle: 'Mover Categoría',
      title: 'Mover Categoría',
    },
    remove: {
      title: 'Eliminar Categoría',
      warning: {
        first: 'Estas seguro que desea eliminar la categoria ',
        last: '? Esta accion no se puede deshacer.',
      },
    },
    update: {
      metaTitle: 'Editar Categoría',
      title: 'Editar Categoría',
    },
  },
  toast: {
    createSuccess: 'Se ha creado la categoría correctamente.',
    moveSuccess: 'Se ha movido la categoría correctamente.',
    removeSuccess: 'Se ha eliminado la categoría correctamente.',
    uniqueError: 'Ya existe una categoría con ese nombre',
    updateSuccess: 'Se ha actualizado la categoría correctamente.',
  },
};

export default translations;
