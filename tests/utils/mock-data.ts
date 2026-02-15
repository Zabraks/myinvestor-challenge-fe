import type { BuyFundApiResponse } from '../../src/services/funds/buyFund.api.types';

export interface MockBuyFund {
  fundId: string;
  quantity: number;
}

export interface MockFund {
  id: string;
  name: string;
  category: 'GLOBAL' | 'TECH' | 'HEALTH' | 'MONEY_MARKET';
  currency: 'USD' | 'EUR';
  value: number;
  symbol: string;
  profitability: {
    YTD: number;
    oneYear: number;
    threeYears: number;
    fiveYears: number;
  };
}

export interface MockFundsResponse {
  data: MockFund[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MockFundsConfig {
  page?: number;
  limit?: number;
  sort?: string;
  totalFunds?: number;
  seed?: number;
  delay?: number;
  shouldFail?: boolean;
}

export interface MockBuyConfig {
  delay?: number;
  shouldFail?: boolean;
  onCapture?: (data: MockBuyFund) => void;
}

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

const FUND_NAMES = [
  'Vanguard Total Market',
  'BlackRock Global Allocation',
  'Fidelity Growth',
  'PIMCO Income',
  'JPMorgan Equity',
  'Goldman Sachs Technology',
  'Morgan Stanley Healthcare',
  'T. Rowe Price Capital',
  'Invesco QQQ',
  'Schwab US Large-Cap',
  'State Street S&P 500',
  'Northern Trust International',
  'Wellington Management',
  'Capital Group American',
  'Franklin Templeton Emerging',
  'Dimensional Fund Advisors',
  'Dodge & Cox Stock',
  'American Funds Growth',
  'Federated Hermes',
  'Principal Equity Income',
  'MFS Value',
  'Putnam Investments',
  'Janus Henderson Balanced',
  'Columbia Threadneedle',
  'Nuveen Dividend Value',
];

const CATEGORIES: MockFund['category'][] = ['GLOBAL', 'TECH', 'HEALTH', 'MONEY_MARKET'];
const CURRENCIES: MockFund['currency'][] = ['USD', 'EUR'];
const SYMBOLS = ['VTI', 'BGAF', 'FGRO', 'PIMX', 'JPEQ', 'GSTK', 'MSHC', 'TRPC', 'QQQ', 'SCHX'];

function generateFund(index: number, random: () => number): MockFund {
  const nameIndex = index % FUND_NAMES.length;
  const categoryIndex = Math.floor(random() * CATEGORIES.length);
  const currencyIndex = Math.floor(random() * CURRENCIES.length);

  return {
    id: `fund-${String(index + 1).padStart(3, '0')}`,
    name: FUND_NAMES[nameIndex],
    category: CATEGORIES[categoryIndex],
    currency: CURRENCIES[currencyIndex],
    value: Math.round((5000 + random() * 145000) * 100) / 100,
    symbol: SYMBOLS[index % SYMBOLS.length] || `F${index}`,
    profitability: {
      YTD: Math.round((random() * 20 - 5) * 100) / 100,
      oneYear: Math.round((random() * 35 - 10) * 100) / 100,
      threeYears: Math.round((random() * 60 - 15) * 100) / 100,
      fiveYears: Math.round((random() * 100 - 20) * 100) / 100,
    },
  };
}

export function generateMockFunds(count: number, seed = 12345): MockFund[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => generateFund(i, random));
}

export function generateMockFundsResponse(config: MockFundsConfig = {}): MockFundsResponse {
  const { page = 1, limit = 10, sort, totalFunds = 25, seed = 12345 } = config;

  let funds = generateMockFunds(totalFunds, seed);

  if (sort) {
    const [field, direction] = sort.split(':') as [
      keyof MockFund | 'YTD' | 'oneYear',
      'asc' | 'desc',
    ];

    funds = [...funds].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (['YTD', 'oneYear', 'threeYears', 'fiveYears'].includes(field)) {
        aValue = a.profitability[field as keyof MockFund['profitability']];
        bValue = b.profitability[field as keyof MockFund['profitability']];
      } else {
        aValue = a[field as keyof MockFund] as number | string;
        bValue = b[field as keyof MockFund] as number | string;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'desc' ? bValue - aValue : aValue - bValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      }

      return 0;
    });
  }

  const startIndex = (page - 1) * limit;
  const paginatedData = funds.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: totalFunds,
      totalPages: Math.ceil(totalFunds / limit),
    },
  };
}

export function generateMockBuyFundsResponse(config: MockBuyFund): BuyFundApiResponse {
  return {
    message: 'Purchase successful',
    data: {
      portfolio: [
        {
          id: config.fundId,
          quantity: config.quantity,
        },
      ],
    },
  };
}

export const TEST_SCENARIOS = {
  empty: { totalFunds: 0 },
  single: { totalFunds: 1 },
  standard: { totalFunds: 25, limit: 10 },
  large: { totalFunds: 100, limit: 10 },
} as const;
