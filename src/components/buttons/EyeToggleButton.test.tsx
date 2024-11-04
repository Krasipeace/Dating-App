import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EyeToggleButton from "./EyeToggleButton";

describe("EyeToggleButton component tests", () => {
    it("Renders 1st eye icon when visible is false", () => {
        render(<EyeToggleButton isVisible={true} onClick={() => { }} />);

        expect(screen.getByTestId("FaEyeSlash")).toBeInTheDocument();
    });

    it("Renders 2nd eye icon when visible is true", () => {
        render(<EyeToggleButton isVisible={false} onClick={() => { }} />);

        expect(screen.queryByTestId("FaEyeSlash")).not.toBeInTheDocument();
    });
});