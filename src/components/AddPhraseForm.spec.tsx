import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import { vi } from 'vitest'
import AddPhraseForm from './AddPhraseForm';

describe("Add Phrase Form component", () => {

    const add = vi.fn();
    const onSuccess = vi.fn();

    afterEach(() => {
        // Global config cleanup doesn't seem to work here
        cleanup();
    });

    describe("When input is valid", () => {
        it("Should call add and onSuccess functions", () => {
            render(<AddPhraseForm add={add} onSuccess={onSuccess} />);
            const input = screen.getByTestId("phraseInput");
            const form = screen.getByTestId('newPhraseForm');
            
            fireEvent.change(input, { target: { value: 'Testing' }});
            fireEvent.submit(form);
            
            expect(add.mock.calls.length).toEqual(1);
            expect(onSuccess.mock.calls.length).toEqual(1);
        });
    });

    describe("When input is not valid", () => {
        describe("because it's empty", () => {
            it("Should show an error message indicating so", () => {
                render(<AddPhraseForm add={add} onSuccess={onSuccess} />);
                const input = screen.getByTestId("phraseInput");
                const form = screen.getByTestId('newPhraseForm');
                
                fireEvent.change(input, { target: { value: ' ' }});
                fireEvent.submit(form);
                
                const err = screen.getByTestId('errorMsg');
                expect(err.textContent).toContain('You must enter at least one non-whitespace character.');
            });
        });
        describe("because it is too long", () => {
            it("Should show an error message indicating so", () => {
                render(<AddPhraseForm add={add} onSuccess={onSuccess} />);
                const input = screen.getByTestId("phraseInput");
                const form = screen.getByTestId('newPhraseForm');
                
                fireEvent.change(input, { target: { value: 'i'.repeat(201) }});
                fireEvent.submit(form);
                
                const err = screen.getByTestId('errorMsg');
                expect(err.textContent).toContain('Phrase can be up to 200 characters long.');
            });
        });
    });
});
