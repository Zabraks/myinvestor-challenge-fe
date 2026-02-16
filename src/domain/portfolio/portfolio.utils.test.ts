import { describe, it, expect } from 'vitest';
import { sortByName, groupByCategory } from './portfolio.utils';

describe('sortByName', () => {
  it('should sort items alphabetically by name', () => {
    const items = [{ name: 'exampleW' }, { name: 'exampleJ' }, { name: 'exampleA' }];
    const result = sortByName(items);
    expect(result[0].name).toBe('exampleA');
    expect(result[1].name).toBe('exampleJ');
    expect(result[2].name).toBe('exampleW');
  });

  it('should be case insensitive', () => {
    const items = [{ name: 'ba' }, { name: 'Ab' }, { name: 'aa' }];
    const result = sortByName(items);
    expect(result.map((i) => i.name)).toEqual(['aa', 'Ab', 'ba']);
  });

  it('should ignore accents, etc', () => {
    const items = [
      { name: 'Zaragoza' },
      { name: 'Barcelona' },
      { name: 'Ávila' },
      { name: 'Albacete' },
    ];
    const result = sortByName(items);
    expect(result[0].name).toBe('Albacete');
    expect(result[1].name).toBe('Ávila');
    expect(result[2].name).toBe('Barcelona');
    expect(result[3].name).toBe('Zaragoza');
  });
});

describe('groupByCategory', () => {
  it('should group items by their category', () => {
    const items = [
      { id: 1, name: 'Fondo A', category: 'Salud' },
      { id: 2, name: 'Fondo B', category: 'Bonos' },
      { id: 3, name: 'Fondo C', category: 'Salud' },
    ];
    const result = groupByCategory(items);

    expect(result).toHaveLength(2);

    const health = result.find((g) => g.nameCategory === 'Salud');
    expect(health?.items).toHaveLength(2);
    expect(health?.items).toContain(items[0]);
    expect(health?.items).toContain(items[2]);

    const bonds = result.find((g) => g.nameCategory === 'Bonos');
    expect(bonds?.items).toHaveLength(1);
    expect(bonds?.items).toContain(items[1]);
  });

  it('should return an empty array when input is empty', () => {
    expect(groupByCategory([])).toEqual([]);
  });
});
