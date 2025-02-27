import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App base component', () => {
    render(<App />)
    it("Should render and contain and h1 with appTitle as testid", () => {
        const appTitle = screen.getByTestId('appTitle')
        expect(appTitle.localName).toEqual('h1')
    })

    const input = screen.getByTestId('phraseInput') as HTMLFormElement;
    const form = screen.getByTestId('newPhraseForm');
    describe("Initial state", () => {
        it("Should have an input to add a first phrase", () => {
            expect(input.localName).toEqual('textarea')
            expect(input.value).toBe("")
        })
    })

    describe("Add a first phrase", () => {
        it("Should allow for user input and submit", () => {
            fireEvent.change(input, { target: { value: 'Testing' }})
            expect(input.value).toBe("Testing")
            fireEvent.submit(form)
            const oldInput = screen.queryByTestId('phraseInput')
            expect(oldInput).toBeNull()
        })
    })
})