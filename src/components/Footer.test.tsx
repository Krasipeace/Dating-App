import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer Component tests', () => {
    it("displays the full footer content correctly", () => {
        render(<Footer />);
        const year = new Date().getFullYear();

        expect(screen.getByText(`© ${year}`)).toBeInTheDocument();
        expect(screen.getByText("Heart")).toBeInTheDocument();
        expect(screen.getByText("Bound")).toBeInTheDocument();

        const githubLink = screen.getByRole("link", { name: /go to GitHub source code/i });
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute("href", "https://github.com/Krasipeace/Dating-App");
        expect(githubLink).toHaveAttribute("target", "_blank");

        const githubIcon = screen.getByLabelText(/github icon/i);
        expect(githubIcon).toBeInTheDocument();

        const privacyLink = screen.getByRole("link", { name: /privacy policy/i });
        expect(privacyLink).toBeInTheDocument();
        expect(privacyLink).toHaveAttribute("href", "https://heartbound.vercel.app/privacy");
        expect(privacyLink).toHaveAttribute("target", "_blank");
    });
});