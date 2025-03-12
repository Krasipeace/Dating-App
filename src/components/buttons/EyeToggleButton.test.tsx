import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EyeToggleButton from "./EyeToggleButton";

describe("EyeToggleButton component tests", () => {
    it("renders 1st eye icon when visible is false", () => {
        render(<EyeToggleButton isVisible={true} onClick={() => { }} />);
        expect(screen.getByTestId("FaEyeSlash")).toBeInTheDocument();
    });

    it("renders 2nd eye icon when visible is true", () => {
        render(<EyeToggleButton isVisible={false} onClick={() => { }} />);
        expect(screen.queryByTestId("FaEyeSlash")).not.toBeInTheDocument();
    });

    it("has correct screen reader text when isVisible is true", () => {
        render(<EyeToggleButton isVisible={true} onClick={() => { }} />);
        expect(screen.getByText("Hide password")).toBeInTheDocument();
    });

    it("has correct screen reader text when isVisible is false", () => {
        render(<EyeToggleButton isVisible={false} onClick={() => { }} />);
        expect(screen.getByText("Show password")).toBeInTheDocument();
    });
});