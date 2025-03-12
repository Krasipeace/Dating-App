import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import GenderSelectionButton from "./GenderSelectionButton";
import { FaFemale, FaMars } from "react-icons/fa";

describe("GenderSelectionButton component tests", () => {
    it("renders the button with the correct Male icon", () => {
        render(<GenderSelectionButton icon={FaMars} value="Male" isSelected={false} onClick={() => { }} />);
        expect(screen.getByRole("button", { name: "Male" })).toBeInTheDocument();
    });

    it("renders the button with the correct Female icon", () => {
        render(<GenderSelectionButton icon={FaFemale} value="Female" isSelected={false} onClick={() => { }} />);
        expect(screen.getByRole("button", { name: "Female" })).toBeInTheDocument();
    });

    it("has correct screen reader text of Male selection", () => {
        render(<GenderSelectionButton icon={FaMars} value="Male" isSelected={true} onClick={() => { }} />);
        expect(screen.getByText("Male")).toBeInTheDocument();
    });

    it("has correct screen reader text of Female selection", () => {
        render(<GenderSelectionButton icon={FaFemale} value="Female" isSelected={true} onClick={() => { }} />);
        expect(screen.getByText("Female")).toBeInTheDocument();
    });
});