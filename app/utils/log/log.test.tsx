import log from './log';

const consoleSpy = jest.spyOn(console, 'log');

describe('log Utility logs correctly', () => {
  it('Does not log when told specifically not to log', () => {
    log('Message 3', false);
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it('Logs when told specifically to log', () => {
    log('Message 2', true);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
