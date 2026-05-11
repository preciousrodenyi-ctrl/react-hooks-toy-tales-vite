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

describe("ToyForm Submission", () => {
  it("submits a new toy and displays it", async () => {
    global.setFetchResponse(global.baseToys)

    const { getByPlaceholderText, getByText, findByText } = render(<App />)
    const firstToy = {name: "First Toy", image: "new-toy.jpg", likes: 0}

    fireEvent.click(getByText("Add a Toy"))

    fireEvent.change(getByPlaceholderText("Enter a toy's name..."), {target: {value: firstToy.name}})
    fireEvent.change(getByPlaceholderText("Enter a toy's image URL..."), {target: {value: firstToy.image}})

    global.setFetchResponse({...firstToy, id: 3})

    fireEvent.click(getByText("Create New Toy"))

    const newToy = await findByText(firstToy.name)
    expect(newToy).toBeInTheDocument()
  })
})
