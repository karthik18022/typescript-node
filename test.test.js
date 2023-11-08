const { describe, default: test } = require('node:test')
const healthcheck = require('./service/userService')

// describe('healthcheck', () => {
//     test("check health", () => {
//         const health = healthcheck.checkHealth();
//         console.log('check health', health);
//         expect(health).to.equal('server running...');
//     });
// })

describe("Testing with Jest", () => { 
  test("Addition", () => { 
    const sum = 2 + 3; 
    const expectedResult = 5; 
    expect(sum).toEqual(expectedResult); 
  });
});

