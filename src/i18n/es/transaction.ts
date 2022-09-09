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
    currency: 'Moneda',
    initialAmount: 'Monto inicial',
    initialAmountPlaceholder: 'Ingrese un monto inicial',
    isDefault: 'Seleccionar por defecto',
    name: 'Nombre',
    namePlaceholder: 'Ingrese el nombre de la cuenta',
    type: 'Tipo',
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
