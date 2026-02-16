import type { ApiFund, GetFundsApiResponse, Category, Currency } from '../../src/domain/fund';
import type { FundActionResponse, TransferFundActionRequest } from '../../src/services/fund-action';
import type { PortfolioItemDto, PortfolioResponseDto } from '../../src/services/portfolio';

export interface CapturedFundAction {
  fundId: string;
  quantity: number;
}

export type CapturedTransferAction = TransferFundActionRequest;

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
  onCapture?: (data: CapturedFundAction) => void;
}

export interface MockSellConfig {
  delay?: number;
  shouldFail?: boolean;
  onCapture?: (data: CapturedFundAction) => void;
}

export interface MockTransferConfig {
  delay?: number;
  shouldFail?: boolean;
  onCapture?: (data: CapturedTransferAction) => void;
}

export interface MockPortfolioFullConfig {
  delay?: number;
  shouldFail?: boolean;
  items?: PortfolioItemDto[];
  empty?: boolean;
}

export interface MockFundDetailConfig {
  delay?: number;
  shouldFail?: boolean;
  fundId?: string;
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

const CATEGORIES: Category[] = ['GLOBAL', 'TECH', 'HEALTH', 'MONEY_MARKET'];
const CURRENCIES: Currency[] = ['USD', 'EUR'];
const SYMBOLS = ['VTI', 'BGAF', 'FGRO', 'PIMX', 'JPEQ', 'GSTK', 'MSHC', 'TRPC', 'QQQ', 'SCHX'];

function generateFund(index: number, random: () => number): ApiFund {
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

export function generateMockFunds(count: number, seed = 12345): ApiFund[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => generateFund(i, random));
}

export function generateMockFundsResponse(config: MockFundsConfig = {}): GetFundsApiResponse {
  const { page = 1, limit = 10, sort, totalFunds = 25, seed = 12345 } = config;

  let funds = generateMockFunds(totalFunds, seed);

  if (sort) {
    const [field, direction] = sort.split(':') as [
      keyof ApiFund | 'YTD' | 'oneYear',
      'asc' | 'desc',
    ];

    funds = [...funds].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      if (['YTD', 'oneYear', 'threeYears', 'fiveYears'].includes(field)) {
        aValue = a.profitability[field as keyof ApiFund['profitability']];
        bValue = b.profitability[field as keyof ApiFund['profitability']];
      } else {
        aValue = a[field as keyof ApiFund] as number | string;
        bValue = b[field as keyof ApiFund] as number | string;
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

export function generateMockBuyFundsResponse(config: CapturedFundAction): FundActionResponse {
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

export function generateMockSellFundsResponse(config: CapturedFundAction): FundActionResponse {
  return {
    message: 'Sale successful',
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

export function generateMockTransferFundsResponse(
  config: CapturedTransferAction
): FundActionResponse {
  return {
    message: 'Transfer successful',
    data: {
      portfolio: [
        {
          id: config.fromFundId,
          quantity: config.quantity,
        },
        {
          id: config.toFundId,
          quantity: config.quantity,
        },
      ],
    },
  };
}

export function generateMockPortfolioResponse(
  config?: MockPortfolioFullConfig
): PortfolioResponseDto {
  if (config?.empty) {
    return { data: [] };
  }

  if (config?.items) {
    return { data: config.items };
  }

  // Default portfolio items que corresponden a fondos del catálogo mock
  const funds = generateMockFunds(25, 12345);
  const defaultItems: PortfolioItemDto[] = [
    { id: 'fund-001', name: funds[0].name, quantity: 100, totalValue: 15000.5 },
    { id: 'fund-002', name: funds[1].name, quantity: 50, totalValue: 7500.25 },
    { id: 'fund-003', name: funds[2].name, quantity: 75, totalValue: 11250.75 },
  ];

  return {
    data: defaultItems,
  };
}

export function generateMockFundDetailResponse(fundId: string): { data: ApiFund } {
  const funds = generateMockFunds(25, 12345);
  const fund = funds.find((f) => f.id === fundId) ?? funds[0];
  return { data: fund };
}

export const TEST_SCENARIOS = {
  empty: { totalFunds: 0 },
  single: { totalFunds: 1 },
  standard: { totalFunds: 25, limit: 10 },
  large: { totalFunds: 100, limit: 10 },
} as const;
