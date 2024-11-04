import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import StarButton from "./StarButton";

describe("StarButton component tests", () => {
    it("Renders 1st star classes on icon when selected is false", () => {
        render(<StarButton selected={false} loading={false} />);

        expect(screen.getByTestId("GoStarFill")).toHaveClass("fill-neutral-500/70");
    });

    it("Renders 2nd star classes on icon when selected is true", () => {
        render(<StarButton selected={true} loading={false} />);

        expect(screen.queryByTestId("GoStarFill")).toHaveClass("fill-orange-300");
    });

    it("Renders spinner icon when loading is true", () => {
        render(<StarButton selected={false} loading={true} />);

        expect(screen.getByTestId("ImSpinner2")).toBeInTheDocument();
    });
});