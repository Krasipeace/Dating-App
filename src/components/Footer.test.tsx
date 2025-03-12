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

    it("displays the copyright text", () => {
        render(<Footer />);
        expect(screen.getByText(/© \d{4} - Krasimir Dramaliev/i)).toBeInTheDocument();
    });

    it("renders GitHub link with correct aria-label", () => {
        render(<Footer />);
        const githubLink = screen.getByRole("link", { name: "go to GitHub" });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute("href", "https://github.com/krasipeace");
    });

    it("renders GitHub icon with correct accessibility attributes", () => {
        render(<Footer />);
        const githubIcon = screen.getByLabelText("github icon");
        expect(githubIcon).toBeInTheDocument();
    });
});