// 0-classroom.test.js
const { taskFirst, taskNext } = require('./0-classroom');

describe('Task Tests', () => {
  test('taskFirst returns the correct string', () => {
    expect(taskFirst()).toBe('This is task first');
  });

  test('taskNext returns the correct string', () => {
    expect(taskNext()).toBe('This is task next');
  });
});
