import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer Component tests', () => {
    it('renders a footer text', () => {
        render(<Footer />);

        const text = screen.getByText(/Krasimir Dramaliev/i);

        expect(text).toBeInTheDocument();
    });

    it('renders a Link component', () => {
        render(<Footer />);

        const link = screen.getByRole('link');

        expect(link).toBeInTheDocument();
    });
});