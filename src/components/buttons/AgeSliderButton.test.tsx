import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AgeSliderButton from "./AgeSliderButton";

describe("AgeSliderButton component tests", () => {
    it("renders age slider button", () => {
        render(<AgeSliderButton defaultValue={[18, 100]} onChangeEnd={() => { }} />);

        const slider = screen.getByTestId("AgeSliderButton");

        expect(slider).toBeInTheDocument();
        expect(slider).toHaveAttribute("aria-label", "Select age range");
    });

    it("has correct screen reader text for the selected age range", () => {
        render(<AgeSliderButton defaultValue={[18, 100]} onChangeEnd={() => { }} />);
        expect(screen.getByText("Selected age range: 18 to 100")).toBeInTheDocument();
    });
});