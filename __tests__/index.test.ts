import main from '../src/index';
import { test, expect } from '@jest/globals';

test('the data is hello world', () => {
  return expect(main()).resolves.toBe('hello world');
});