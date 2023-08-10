export const investment = {
  // headers: {
  //   currency: 'Moneda',
  //   initialAmount: 'Monto Inicial',
  //   isPrimary: 'Principal',
  //   name: 'Nombre',
  //   quotationId: 'Cotización',
  //   type: 'Tipo',
  // },
  // form: {
  //   currency: 'Moneda',
  //   initialAmount: 'Monto inicial',
  //   initialAmountPlaceholder: 'Ingrese un monto inicial',
  //   isPrimary: 'Es tu cuenta principal',
  //   name: 'Nombre',
  //   namePlaceholder: 'Ingrese el nombre de la cuenta',
  //   quotationId: 'Cotización',
  //   type: 'Tipo',
  // },
  pages: {
    create: {
      metaTitle: 'Nueva Inversion',
      title: 'Nueva Inversion',
    },
    index: {
      metaTitle: 'Mis Inversiones',
      title: 'Mis Inversiones',
    },
    remove: {
      title: 'Eliminar Inversion',
      warning: {
        first: 'Estas seguro que desea eliminar la inversion ',
        last: '? Esta accion no se puede deshacer.',
      },
    },
    update: {
      metaTitle: 'Editar Inversion',
      title: 'Editar Inversion',
    },
  },
  toast: {
    createSuccess: 'Se ha creado la inversion correctamente.',
    removeSuccess: 'Se ha eliminado la inversion correctamente.',
    updateSuccess: 'Se ha actualizado la inversion correctamente.',
  },
};
