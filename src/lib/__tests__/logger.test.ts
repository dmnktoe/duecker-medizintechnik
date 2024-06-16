import logger from '@/lib/logger';

describe('logger', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should log when showLogger is true', () => {
    process.env.showLogger = 'true';
    logger('Test object', 'Test comment');
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should log with correct parameters', () => {
    process.env.showLogger = 'true';
    logger('Test object', 'Test comment');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      '%c ============== INFO LOG \n',
      'color: #22D3EE',
      `${typeof window !== 'undefined' && window?.location.pathname}\n`,
      '=== Test comment\n',
      'Test object',
    );
  });
});
