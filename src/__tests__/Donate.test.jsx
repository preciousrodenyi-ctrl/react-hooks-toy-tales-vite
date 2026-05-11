import { vi, expect, describe, it } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

describe("Deleting a Toy", () => {
    it("removes the toy when donate button is clicked", async () => {
        global.setFetchResponse(global.baseToys)
        const { findByText, queryByText, getAllByText } = render(<App />)
        
        const woodyTitle = await findByText("Woody")
        expect(woodyTitle).toBeInTheDocument()

        const donateButtons = getAllByText(/Donate/)
        global.setFetchResponse({})

        fireEvent.click(donateButtons[0])

        // This is the key fix for the "Woody still in document" error
        await waitFor(() => {
            expect(queryByText("Woody")).not.toBeInTheDocument()
        })
    })
})