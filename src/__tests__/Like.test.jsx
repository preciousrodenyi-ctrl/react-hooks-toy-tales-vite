import { vi, expect, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
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

describe("Liking a Toy", () => {
    it("increments likes when the like button is clicked", async () => {
        global.setFetchResponse([{
            "id": 1,
            "name": "Woody",
            "image": "woody-image.png",
            "likes": 5
        }])

        const { findByText } = render(<App />)

        // Use the exact string to avoid confusion with "5 Likes" text
        const likeBtn = await findByText('Like <3')
        const pTag = likeBtn.previousSibling

        expect(pTag.textContent).toContain("5 Likes")

        global.setFetchResponse({
            "id": 1,
            "name": "Woody",
            "image": "woody-image.png",
            "likes": 6
        })

        fireEvent.click(likeBtn)

        const pTagUpdated = await findByText(/6 Likes/)
        expect(pTagUpdated).toBeInTheDocument()
    })
})