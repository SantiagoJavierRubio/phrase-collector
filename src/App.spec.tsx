import { render, screen } from '@testing-library/react';
import App from './App';

describe('App base component', () => {
    it("Should render and contain a div with the appComponent as testid", () => {
        render(<App />)
        const appComponent = screen.getByTestId('appComponent')
        expect(appComponent).not.toBeNull();
        expect(appComponent.localName).toEqual('div')
    })
})