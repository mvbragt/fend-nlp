import { handleSubmit } from "./formHandler";

// Mocking fetch globally
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ score_tag: "P", confidence: "100", agreement: "AGREEMENT", subjectivity: "SUBJECTIVE", irony: "NONIRONIC" }),
    })
);

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    fetch.mockClear();

    // Set up our document body
    document.body.innerHTML = `
    <input id="inputUrl" type="text" value="https://example.com">
    <div id="sentiment-result"></div>
    <div id="confidence-result"></div>
    <div id="agreement-result"></div>
    <div id="subjectivity-result"></div>
    <div id="irony-result"></div>
  `;
});

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", async () => {
        // Check if handleSubmit function is defined
        expect(handleSubmit).toBeDefined();

        // Simulate form submission
        await handleSubmit({ preventDefault: () => {} });

        // Expect fetch to have been called
        expect(fetch).toHaveBeenCalledTimes(1);

        // Wait for fetch to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if UI is updated correctly - just checking one as example
        expect(document.getElementById('sentiment-result').textContent).toBe("P");
    });
});
