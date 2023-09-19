import clsxm from './../clsxm';

describe('clsxm', () => {
  it('should correctly merge classes', () => {
    const classes = ['bg-red-500', 'text-white', 'p-4'];
    const expected = 'bg-red-500 text-white p-4';
    expect(clsxm(...classes)).toBe(expected);
  });
});
