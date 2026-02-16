import { describe, it, expect } from 'vitest';
import { groupByCategory } from './groupByCategory'; // Ajusta la ruta

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
