import { beforeAll, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// These are mock toys the tests use
global.baseToys = [
  { id: 1, name: "Woody", image: "woody.jpg", likes: 5 },
  { id: 2, name: "Buzz", image: "buzz.jpg", likes: 8 }
];

global.alternateToys = [
  { id: 3, name: "Jessie", image: "jessie.jpg", likes: 10 }
];

// This is the function that was causing the "is not a function" error
global.setFetchResponse = (data) => {
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  );
};

// Reset mocks before each test
beforeEach(() => {
  vi.restoreAllMocks();
});
