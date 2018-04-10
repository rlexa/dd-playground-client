
const getMockStorage = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};
Object.defineProperty(window, 'localStorage', { value: getMockStorage() });
Object.defineProperty(window, 'sessionStorage', { value: getMockStorage() });

// getComputedStyle - fake it because Angular checks in which browser it executes
Object.defineProperty(window, 'getComputedStyle', { value: () => ['-webkit-appearance'] });

// deterministic now() function
Date.now = () => 1482363367071;

// transform - workaround for JSDOM missing transform property when using Angular Material
Object.defineProperty(document.body.style, 'transform', { value: () => ({ enumerable: true, configurable: true }) });

// polyfills
Object.values = (obj) => Object.keys(obj).map(key => obj[key]);
