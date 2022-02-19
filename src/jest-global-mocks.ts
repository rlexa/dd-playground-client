import {} from 'jest';

/**
 * jest should fail on console.error logging so let's monkey-patch it to throw an actual error
 */
let error = console.error;
console.error = function (message: any) {
  error.apply(console, arguments as any); // keep default behaviour
  throw message instanceof Error ? message : new Error(message);
};

const getMockStorage = () => {
  let storage = {};
  return {
    getItem: (key) => (key in storage ? storage[key] : null),
    setItem: (key, value) => (storage[key] = value || ''),
    removeItem: (key) => delete storage[key],
    clear: () => (storage = {}),
  };
};
Object.defineProperty(window, 'localStorage', {value: getMockStorage()});
Object.defineProperty(window, 'sessionStorage', {value: getMockStorage()});

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'doctype', {value: '<!DOCTYPE html>'});

// getComputedStyle - fake it because Angular checks in which browser it executes
Object.defineProperty(window, 'getComputedStyle', {value: () => ['-webkit-appearance']});

// deterministic now() function
Date.now = () => 1482363367071;

// deterministic random() function
Math.random = () => 0.12345;

// transform - workaround for JSDOM missing transform property when using Angular Material
Object.defineProperty(document.body.style, 'transform', {value: () => ({enumerable: true, configurable: true})});

Object.defineProperty((global as any).Element.prototype, 'innerText', {
  get() {
    return this.textContent;
  },
});

const now = new Date(`2000-01-01T12:00:00.000Z`).getTime();
Date.now = jest.fn(() => now);

Math.random = jest.fn(() => 0.5);
