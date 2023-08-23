const translations = {
  headers: {
    currency: 'Moneda',
    initialAmount: 'Monto Inicial',
    isPrimary: 'Principal',
    name: 'Nombre',
    quotationId: 'Cotización',
    type: 'Tipo',
  },
  form: {
    currency: 'Moneda',
    initialAmount: 'Monto inicial',
    initialAmountPlaceholder: 'Ingrese un monto inicial',
    isPrimary: 'Es tu cuenta principal',
    name: 'Nombre',
    namePlaceholder: 'Ingrese el nombre de la cuenta',
    quotationId: 'Cotización',
    type: 'Tipo',
  },
  pages: {
    create: {
      metaTitle: 'Nueva Cuenta',
      title: 'Nueva Cuenta',
    },
    index: {
      metaTitle: 'Mis Cuentas',
      title: 'Mis Cuentas',
    },
    remove: {
      title: 'Eliminar Cuenta',
      warning: {
        first: 'Estas seguro que desea eliminar la cuenta ',
        last: '? Esta accion no se puede deshacer.',
      },
    },
    update: {
      metaTitle: 'Editar Cuenta',
      title: 'Editar Cuenta',
    },
    noAccount: {
      title: 'No tienes ninguna cuenta',
      button: 'Configurar cuentas',
    },
  },
  toast: {
    createSuccess: 'Se ha creado la cuenta correctamente.',
    removeSuccess: 'Se ha eliminado la cuenta correctamente.',
    uniqueError: 'Ya existe una cuenta con ese nombre',
    updateSuccess: 'Se ha actualizado la cuenta correctamente.',
  },
};

export default translations;
