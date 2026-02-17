import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartNoAxesCombined, Coins, EllipsisVertical } from 'lucide-react';
import { Button } from '@ui/Button/Button';
import {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from './Item';

const meta: Meta<typeof Item> = {
  title: 'UI/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'action', 'muted', 'selected'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'xs'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Item className="w-[350px]">
      <ItemMedia variant="icon">
        <ChartNoAxesCombined />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-md font-bold">Nombre de fondo</ItemTitle>
        <ItemDescription className="flex">
          <span>Participaciones: </span>
          <span className="pl-1.5 font-bold">25</span> <Coins className="w-3" />
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex flex-col text-end items-end">
        <span>Valor</span>
        <ItemDescription className="font-bold">200</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const Outline: Story = {
  render: () => (
    <Item variant="outline" className="w-[350px]">
      <ItemMedia variant="icon">
        <ChartNoAxesCombined />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-md font-bold">Nombre de fondo</ItemTitle>
        <ItemDescription className="flex">
          <span>Participaciones: </span>
          <span className="pl-1.5 font-bold">25</span> <Coins className="w-3" />
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex flex-col text-end items-end">
        <span>Valor</span>
        <ItemDescription className="font-bold">200</ItemDescription>
      </ItemContent>
    </Item>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Item className="w-[350px]">
      <ItemMedia variant="icon">
        <ChartNoAxesCombined />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1 text-md font-bold">Nombre de fondo</ItemTitle>
        <ItemDescription className="flex">
          <span>Participaciones: </span>
          <span className="pl-1.5 font-bold">25</span> <Coins className="w-3" />
        </ItemDescription>
      </ItemContent>
      <ItemContent className="flex flex-col text-end items-end">
        <span>Valor</span>
        <ItemDescription className="font-bold">200</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon" className="text-icon-selected p-0 cursor-pointer">
          <span className="sr-only">abrir menu</span>
          <EllipsisVertical />
        </Button>
      </ItemActions>
    </Item>
  ),
};

export const ItemList: Story = {
  render: () => (
    <ItemGroup className="w-[350px] gap-3">
      <Item className="w-[350px]">
        <ItemMedia variant="icon">
          <ChartNoAxesCombined />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1 text-md font-bold">Nombre de fondo</ItemTitle>
          <ItemDescription className="flex">
            <span>Participaciones: </span>
            <span className="pl-1.5 font-bold">25</span> <Coins className="w-3" />
          </ItemDescription>
        </ItemContent>
        <ItemContent className="flex flex-col text-end items-end">
          <span>Valor</span>
          <ItemDescription className="font-bold">200</ItemDescription>
        </ItemContent>
      </Item>
      <Item className="w-[350px]">
        <ItemMedia variant="icon">
          <ChartNoAxesCombined />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1 text-md font-bold">Nombre de fondo</ItemTitle>
          <ItemDescription className="flex">
            <span>Participaciones: </span>
            <span className="pl-1.5 font-bold">25</span> <Coins className="w-3" />
          </ItemDescription>
        </ItemContent>
        <ItemContent className="flex flex-col text-end items-end">
          <span>Valor</span>
          <ItemDescription className="font-bold">200</ItemDescription>
        </ItemContent>
      </Item>
      <Item className="w-[350px]">
        <ItemMedia variant="icon">
          <ChartNoAxesCombined />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1 text-md font-bold">Nombre de fondo</ItemTitle>
          <ItemDescription className="flex">
            <span>Participaciones: </span>
            <span className="pl-1.5 font-bold">25</span> <Coins className="w-3" />
          </ItemDescription>
        </ItemContent>
        <ItemContent className="flex flex-col text-end items-end">
          <span>Valor</span>
          <ItemDescription className="font-bold">200</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const Selected: Story = {
  render: () => (
    <Item variant="selected" className="w-[350px]">
      <ItemContent>
        <ItemTitle>Item seleccionado</ItemTitle>
      </ItemContent>
    </Item>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[350px]">
      <Item variant="outline" size="default">
        <ItemContent>
          <ItemTitle>Size default</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemContent>
          <ItemTitle>Size sm</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemContent>
          <ItemTitle>Size xs</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  ),
};
