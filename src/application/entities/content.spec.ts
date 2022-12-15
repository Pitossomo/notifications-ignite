import { Content } from './content';

describe('Notification content', () => {
  it('should be able to be created', () => {
    const content = new Content('Você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should NOT be able to be created with less than 5 characters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('should NOT be able to be created with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow();
  });
});
