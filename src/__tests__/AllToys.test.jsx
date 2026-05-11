import { vi, expect, describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../components/App';
import '@testing-library/jest-dom';

global.baseToys = [
  { id: 1, name: "Woody", image: "woody.jpg", likes: 5 },
  { id: 2, name: "Buzz", image: "buzz.jpg", likes: 8 }
];

global.setFetchResponse = (data) => {
  global.fetch = vi.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    })
  );
};

describe("1st Deliverable", () => {
    it("Displays all toys on startup", async () => {
        global.setFetchResponse(global.baseToys)
        const { findAllByTestId } = render(<App />)
        const toyCards = await findAllByTestId('toy-card')
        expect(toyCards.length).toBe(2)
    })

    it("Toys aren't hardcoded", async () => {
        const testToys = [...global.baseToys, {id: 3, name: "Slinky Dog", image: "slinky.jpg", likes: 4}]
        global.setFetchResponse(testToys)
        const { findAllByTestId } = render(<App />)
        const toyCards = await findAllByTestId('toy-card')
        expect(toyCards.length).toBe(3)
    })
})