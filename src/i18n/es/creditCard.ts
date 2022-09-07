export const creditCard = {
  headers: {
    actions: '...',
    name: 'Nombre',
    type: 'Tipo',
  },
  form: {
    name: 'Nombre',
    namePlaceholder: 'Ingrese un nombre para la tarjeta',
    type: 'Tipo',
  },
  pages: {
    create: {
      metaTitle: 'Nueva Tarjeta',
      title: 'Nueva Tarjeta',
    },
    index: {
      metaTitle: 'Mis Tarjetas',
      title: 'Mis Tarjetas',
    },
    remove: {
      title: 'Eliminar Tarjeta',
    },
    update: {
      metaTitle: 'Editar Tarjeta',
      title: 'Editar Tarjeta',
    },
  },
  toast: {
    createSuccess: 'Se ha creado la tarjeta correctamente.',
    removeSuccess: 'Se ha eliminado la tarjeta correctamente.',
    uniqueError: 'Ya existe una tarjeta con ese nombre',
    updateSuccess: 'Se ha actualizado la tarjeta correctamente.',
  },
};
