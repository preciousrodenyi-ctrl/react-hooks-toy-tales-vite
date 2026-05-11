import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom';

// Define the mock data and function HERE inside the test file
global.baseToys = [
  { id: 1, name: "Woody", image: "woody.jpg", likes: 5 },
  { id: 2, name: "Buzz", image: "buzz.jpg", likes: 8 }
];

global.alternateToys = [
  { id: 3, name: "Jessie", image: "jessie.jpg", likes: 10 }
];

global.setFetchResponse = (data) => {
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};

describe('1st Deliverable', () => {
  test('Displays all toys on startup', async () => {
    global.setFetchResponse(global.baseToys)
    let { findAllByTestId } = render(<App />);
    const toyCards = await findAllByTestId('toy-card');
    expect(toyCards).toHaveLength(global.baseToys.length);
    
    // ... rest of the test code
  });
  // ...
});