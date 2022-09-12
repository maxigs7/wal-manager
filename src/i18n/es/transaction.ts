export const transaction = {
  actions: {
    changeQuotation: 'Cambiar Cotización',
    expenses: 'Nuevo Gasto',
    incomes: 'Nuevo Ingreso',
  },
  headers: {
    amount: 'Importe',
    category: 'Categoría',
    creditCard: 'Tarjeta',
    date: 'Fecha',
    description: 'Detalle',
  },
  filters: {
    accountId: 'Seleccione una cuenta',
    categoryId: 'Seleccione una categoría',
    creditCardId: 'Seleccione una tarjeta',
  },
  form: {
    amount: 'Monto',
    accountId: 'Cuenta',
    accountIdPlaceHolder: 'Seleccione una cuenta',
    billedDate: 'Fecha de cobro',
    createAll: 'Crear todas las cuotas',
    categoryId: 'Categoría',
    categoryIdPlaceHolder: 'Seleccione una categoría',
    creditCardId: 'Tarjeta',
    creditCardIdPlaceHolder: 'Seleccione una tarjeta',
    date: 'Fecha',
    description: 'Descripción',
    feeNumber: 'Cuotas',
    isPaid: 'Esta Pago',
    isRecurring: 'Es Recurrente',
    seeLess: 'Ocultar',
    seeMore: 'Ver mas',
  },
  pages: {
    create: {
      metaTitle: 'Nuevo Movimiento',
      title: 'Nuevo Movimiento',
    },
    index: {
      metaTitle: 'Mis Movimientos',
      title: 'Mis Movimientos',
    },
    remove: {
      title: 'Eliminar Movimiento',
    },
    update: {
      metaTitle: 'Editar Movimiento',
      title: 'Editar Movimiento',
    },
  },
  toast: {
    saveSuccess: 'Se ha guardado el movimiento correctamente.',
    removeSuccess: 'Se ha eliminado el movimiento correctamente.',
  },
};
