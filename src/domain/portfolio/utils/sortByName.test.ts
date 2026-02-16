import { describe, it, expect } from 'vitest';
import { sortByName } from './sortByName'; // Ajusta la ruta

describe('formatValue', () => {
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
