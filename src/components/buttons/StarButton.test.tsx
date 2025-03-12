import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StarButton from "./StarButton";

describe("StarButton component tests", () => {
    it("renders spinner icon when loading is true", () => {
        render(<StarButton selected={false} loading={true} />);
        expect(screen.getByTestId("ImSpinner2")).toBeInTheDocument();
    });

    it("renders the unselected star button", () => {
        render(<StarButton selected={false} loading={false} />);
        const starIcon = screen.getByTestId("GoStarFill");
        expect(starIcon).toBeInTheDocument();
        expect(starIcon).toHaveClass("fill-neutral-500/70"); // Check color class
    });

    it("renders the selected star button", () => {
        render(<StarButton selected={true} loading={false} />);
        const starIcon = screen.getByTestId("GoStarFill");
        expect(starIcon).toBeInTheDocument();
        expect(starIcon).toHaveClass("fill-orange-300"); // Check color class
    });

    it("shows loading spinner when loading is true", () => {
        render(<StarButton selected={false} loading={true} />);
        expect(screen.getByTestId("ImSpinner2")).toBeInTheDocument();
        expect(screen.queryByTestId("GoStarFill")).not.toBeInTheDocument();
    });

    it("provides proper web accessibility for screen readers", () => {
        render(<StarButton selected={false} loading={false} />);
        const button = screen.getByRole("button", { name: "Set as profile image" });
        expect(button).toBeInTheDocument();
    });
});