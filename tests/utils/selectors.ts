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
    trigger: 'Open menu',
    buy: 'Comprar',
    viewDetails: 'Ver Detalle',
  },

  buyDialog: {
    title: /Comprar|Buy/i,
    closeButton: 'Close',
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
