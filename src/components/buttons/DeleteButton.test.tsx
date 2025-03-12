import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DeleteButton from "./DeleteButton";

describe("DeleteButton component tests", () => {
    it("renders delete icons when not loading", () => {
        render(<DeleteButton loading={false} />);

        expect(screen.getByTestId("TiDeleteOutline")).toBeInTheDocument();
        expect(screen.getByTestId("TiDelete")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });

    it("renders spinner icon when loading is true", () => {
        render(<DeleteButton loading={true} />);
        expect(screen.getByTestId("ImSpinner2")).toBeInTheDocument();
        expect(screen.queryByTestId("TiDeleteOutline")).not.toBeInTheDocument();
        expect(screen.queryByTestId("TiDelete")).not.toBeInTheDocument();
    });

    it("has correct screen reader text of DeleteButton", () => {
        render(<DeleteButton loading={false} />);
        expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    });

    it("has correct screen reader label when loading", () => {
        render(<DeleteButton loading={true} />);
        expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    });
});
