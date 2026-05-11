import { vi, expect, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
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

describe("Liking a Toy", () => {
    it("increments likes when the like button is clicked", async () => {
        let likes

        global.setFetchResponse([{
            "id": 1,
            "name": "Woody",
            "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
            "likes": 5
        }])

        const { findByText } = render(<App />)

        const likeBtn = await findByText('Like <3')
        const pTag = likeBtn.previousSibling

        expect(pTag.textContent).toContain("5 Likes")

        global.setFetchResponse({
            "id": 1,
            "name": "Woody",
            "image": "http://www.pngmart.com/files/3/Toy-Story-Woody-PNG-Photos.png",
            "likes": 6
        })

        fireEvent.click(likeBtn)

        const pTagUpdated = await findByText(/6 Likes/)
        expect(pTagUpdated).toBeInTheDocument()
    })
})