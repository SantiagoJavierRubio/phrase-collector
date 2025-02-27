import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import { PhraseListMock } from "../mocks/phraseList";
import { vi } from 'vitest';
import PhraseList from "./PhraseList";

describe("Phrase List display component", () => {
    const add = vi.fn();
    const remove = vi.fn();

    afterEach(() => {
        // Global config cleanup doesn't seem to work here
        cleanup(); 
    });

    describe("Unfiltered display", () => {
        it("Should display all phrases", () => {
            render(<PhraseList phrases={PhraseListMock} add={add} remove={remove} />);
            const phrases = screen.queryAllByTestId('phrase');
            
            expect(phrases.length).toEqual(PhraseListMock.length);
            PhraseListMock.forEach(phrase => {
                const p = screen.queryByText(phrase.text);
                expect(p).not.toBeNull();
            });
        });
        
        describe("When delete buttons are clicked", () => {
            it("Should call the remove callback for each one", () => {
                render(<PhraseList phrases={PhraseListMock} add={add} remove={remove} />);
                const phrases = screen.queryAllByTestId('phrase');
                
                phrases.forEach(phrase => {
                    const btn = phrase.querySelector('button');
                    fireEvent.click(btn as HTMLButtonElement);
                });
                
                expect(remove.mock.calls.length).toEqual(PhraseListMock.length);
            });
        });
        
        describe("When the add new button is clicked", () => {
            it("Should display the form modal", () => {
                render(<PhraseList phrases={PhraseListMock} add={add} remove={remove} />);
                const addNew = screen.getByTestId('addNew') as HTMLButtonElement;
                fireEvent.click(addNew);
                const modal = screen.getByTestId('modal');
                expect(modal.className).toContain('scale-100');
            });
        });
    });

    describe("Search functionality", () => {
        describe("When matching one phrase", () => {
            it("Should display just one card", async () => {
                render(<PhraseList phrases={PhraseListMock} add={add} remove={remove} />);
                const searchbar = screen.getByTestId('searchbar');
                fireEvent.change(searchbar, { target: { value: 'Lorem ipsum' }});
                // Ensure debounced value kicks in
                await waitFor(() => {
                    const phrases = screen.queryAllByTestId('phrase');
                    expect(phrases.length).toEqual(1);
                })
            });
        });
    });
});
