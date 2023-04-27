export const common = {
  appName: 'Wal Manager',
  breadcrumbs: {
    accounts: 'Cuentas',
    admin: 'Admin',
    categories: 'Categorías',
    create: 'Crear',
    creditCards: 'Tarjetas',
    movements: 'Movimientos',
    update: 'Editar',
  },
  cancel: 'Cancelar',
  create: 'Crear',
  defaultEmptyText: 'No se encontraron datos...',
  description: 'Maneje sus finanzas de manera organizada',
  dialog: {
    removeWarning: 'Estas seguro? Esta accion no se puede deshacer.',
  },
  globalFilterPlaceholder: 'Buscar...',
  goBack: 'Volver',
  headers: {
    actions: '...',
  },
  remove: 'Eliminar',
  save: 'Guardar',
  table: {
    pagination: {
      page: 'Pag.',
      pageSummary: (index: number, total: number) => `${index} de ${total}`,
      rowsByPage: (size: number) => `${size} filas`,
      showing: (from: number, to: number, total: number) => {
        return `${from} a ${to} de ${total} ${total > 1 ? 'filas' : 'fila'}`;
      },
    },
  },
  toast: {
    error: 'Error!',
    success: 'Exito!',
  },
  validation: {
    email: 'El correo es invalido',
    required: 'Este campo es requerido',
  },
};
