import { MESSAGES } from '../../src/domain/action';

export const SELECTORS = {
  header: {
    logo: 'MyInvestor',
  },
  menu: {
    funds: {
      title: 'Fondos',
    },
    portfolio: {
      title: 'Portfolio',
    },
  },

  fundsTable: {
    title: 'Lista de fondos',
    table: 'table',
    headers: {
      name: 'Nombre',
      category: 'Categoría',
      currency: 'Moneda',
      value: 'Valor',
      ytd: '2026',
      oneYear: '1A',
      threeYears: '3A',
      fiveYears: '5A',
    },
    row: 'tbody tr',
    cell: 'td',
    emptyState: 'No results.',
  },

  pagination: {
    previous: 'Go to previous page',
    next: 'Go to next page',
  },

  limitSelector: {
    trigger: 'combobox',
    name: 'Mostrar valores',
    options: ['10', '25', '50', '100'],
  },

  rowActions: {
    trigger: 'abrir menu',
    buy: 'Comprar',
    sell: 'Vender',
    transfer: 'Traspasar',
    viewDetails: 'Ver detalle',
  },

  swipeActions: {
    buy: 'Comprar',
    sell: 'Vender',
    transfer: 'Traspasar',
    viewDetails: 'Detalle',
  },

  buyDialog: {
    title: /Comprar fondo/i,
    inputName: /Valor/i,
    sendButton: /Enviar/i,
    closeButton: 'Close',
  },

  sellDialog: {
    title: /Vender fondo/i,
    inputName: /Valor/i,
    sendButton: /Enviar/i,
    closeButton: 'Close',
  },

  transferDialog: {
    title: /Traspasar fondo/i,
    inputName: /Valor/i,
    fundSelect: /Traspasar a/i,
    sendButton: /Enviar/i,
    closeButton: 'Close',
  },

  detailDialog: {
    title: /Detalles del fondo/i,
    closeButton: 'Close',
  },

  portfolio: {
    tabs: {
      funds: 'Fondos',
      orders: 'Órdenes',
    },
    card: {
      title: 'Mis fondos',
    },
    item: {
      role: 'listitem',
      units: 'Participaciones:',
      unitsWithSpace: 'Participaciones: ',
      valor: 'Valor',
    },
    emptyState: {
      title: 'Aún no tienes fondos en tu cartera',
      description: 'Explora el listado de fondos y comienza a invertir.',
      button: 'Ver fondos disponibles',
    },
    error: {
      title: 'Error',
      description: 'Ha habido un error al obtener tu porfolio',
      button: 'Volver a intentarlo',
    },
  },

  orders: {
    card: {
      title: 'Ordenes',
    },
    emptyState: {
      title: 'Aún no se han registrado operaciones',
      description: 'No hay registros de ordenes de compra, venta o traspaso con tus fondos',
    },
    error: {
      title: 'Error',
      description: 'Ha habido un error al obtener el listado de ordenes',
    },
    types: {
      buy: 'Compra',
      sell: 'Venta',
      transfer: 'Traspaso',
    },
  },

  toastMsg: {
    buy: {
      success: 'El fondo se ha comprado correctamente',
      error: 'Ha habido un error en la petición',
    },
    sell: {
      success: 'El fondo se ha vendido correctamente',
      error: 'Ha habido un error en la petición',
    },
    transfer: {
      success: 'El fondo se ha transferido correctamente',
      error: 'Ha habido un error en la petición',
    },
  },

  validations: {
    buy: {
      number: MESSAGES.numberRequired,
      positive: MESSAGES.positive,
      maxValue: MESSAGES.buyMax,
    },
    sell: {
      number: MESSAGES.numberRequired,
      positive: MESSAGES.positive,
      maxValue: (max: number) => MESSAGES.sellMax(max),
    },
    transfer: {
      number: MESSAGES.numberRequired,
      positive: MESSAGES.positive,
      maxValue: (max: number) => MESSAGES.transferMax(max),
      fundRequired: MESSAGES.fundRequired,
    },
  },

  loading: {
    spinner: 'Loading',
    skeleton: 'skeleton',
  },
} as const;

export function getSortableColumnSelector(columnName: string): string {
  return `button:has-text("${columnName}")`;
}

export function getCellSelector(rowIndex: number, columnIndex: number): string {
  return `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${columnIndex + 1})`;
}
