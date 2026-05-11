import { vi, expect, describe, it } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react'; // Added waitFor here
import App from '../components/App';
import '@testing-library/jest-dom';

// --- MOCKING LOGIC START ---
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
// --- MOCKING LOGIC END ---

describe("Deleting a Toy", () => {
    it("removes the toy when donate button is clicked", async () => {
        global.setFetchResponse(global.baseToys)
        const { findByText, queryByText, getAllByText } = render(<App />)
        
        // Wait for toys to load initially
        const woodyTitle = await findByText("Woody")
        expect(woodyTitle).toBeInTheDocument()

        const donateButtons = getAllByText(/Donate/)

        global.setFetchResponse({}) // Mock successful delete response

        fireEvent.click(donateButtons[0])

        // Use waitFor to wait for the DOM to update and Woody to be removed
        await waitFor(() => {
            expect(queryByText("Woody")).not.toBeInTheDocument()
        })
    })
})