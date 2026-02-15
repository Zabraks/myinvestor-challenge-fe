import { BUY_VALIDATION_STRINGS } from '../../src/domain/funds/validation';

export const SELECTORS = {
  header: {
    logo: 'MyInvestor',
    nav: {
      funds: 'Lista de fondos',
      portfolio: 'Mi cartera',
    },
  },

  fundsTable: {
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
    options: ['10', '25', '50', '100'],
  },

  rowActions: {
    trigger: 'abrir menu',
    buy: 'Comprar',
    viewDetails: 'Ver Detalle',
  },

  buyDialog: {
    title: /Comprar fondo/i,
    inputName: /Valor/i,
    sendButton: /Enviar/i,
    closeButton: 'Close',
  },

  toastMsg: {
    buy: {
      success: 'El fondo se ha comprado correctamente',
      error: 'Ha habido un error en la petición',
    },
  },

  validations: {
    buy: {
      number: BUY_VALIDATION_STRINGS.NUMBER_VALIDATION,
      positive: BUY_VALIDATION_STRINGS.POSITIVE_VALIDATION,
      maxValue: BUY_VALIDATION_STRINGS.MAX_VALUE_VALIDATION,
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
