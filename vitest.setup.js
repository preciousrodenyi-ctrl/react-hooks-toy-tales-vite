import '@testing-library/jest-dom'

global.fetch = vi.fn()

global.setFetchResponse = (data) => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  })
}