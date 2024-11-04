import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("DeleteButton component tests", () => {
    it("Renders delete icons when loading is false", () => {
        render(<DeleteButton loading={false} />);

        expect(screen.getByTestId("TiDeleteOutline")).toBeInTheDocument();
        expect(screen.getByTestId("TiDelete")).toBeInTheDocument();
    });

    it("Renders spinner icon when loading is true", () => {
        render(<DeleteButton loading={true} />);

        expect(screen.getByTestId("ImSpinner2")).toBeInTheDocument();
    });
});
