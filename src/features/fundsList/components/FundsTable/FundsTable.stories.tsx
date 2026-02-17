/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { http, HttpResponse } from 'msw';
import { FundsTable } from './FundsTable';
import { fundFactory } from '@mocks/factories';
import { mapFundFromApi, type GetFundsApiResponse } from '@domain/fund';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import { ActionMenuProvider } from '@context/ActionMenuContext';

// Función noop para handlers en stories
const noop = () => {};

const meta: Meta<typeof FundsTable> = {
  title: 'Features/FundsTable',
  component: FundsTable,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <ActionMenuProvider>
        <FundActionDialogProvider>
          <div className="w-full max-w-6xl">
            <Story />
          </div>
        </FundActionDialogProvider>
      </ActionMenuProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FundsTable>;

const fundsFromFactory = fundFactory.buildList(5);
const tableData = fundsFromFactory.map(mapFundFromApi);

export const Default: Story = {
  args: {
    data: tableData,
    sorting: [],
    handleSorting: noop,
  },
};

const techFunds = fundFactory.buildList(5, { category: 'TECH', currency: 'USD' });
const techTableData = techFunds.map(mapFundFromApi);

export const TechFundsOnly: Story = {
  args: {
    data: techTableData,
    sorting: [],
    handleSorting: noop,
  },
};

const highPerformanceFunds = fundFactory.buildList(5, {
  profitability: {
    YTD: 25.5,
    oneYear: 45.2,
    threeYears: 120.8,
    fiveYears: 250.3,
  },
});
const highPerformanceData = highPerformanceFunds.map(mapFundFromApi);

export const HighPerformance: Story = {
  args: {
    data: highPerformanceData,
    sorting: [],
    handleSorting: noop,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    sorting: [],
    handleSorting: noop,
  },
};

const customApiFunds = fundFactory.buildList(3, { category: 'HEALTH' });

export const WithCustomMswHandler: Story = {
  args: {
    data: customApiFunds.map(mapFundFromApi),
    sorting: [],
    handleSorting: noop,
  },
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:3000/funds', () => {
          const response: GetFundsApiResponse = {
            data: customApiFunds,
            pagination: {
              page: 1,
              limit: 10,
              total: customApiFunds.length,
              totalPages: 1,
            },
          };
          return HttpResponse.json(response);
        }),
      ],
    },
  },
};
