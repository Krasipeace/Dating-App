import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import UploadImageButton from "./UploadImageButton";

describe("UploadImageButton component tests", () => {
    it("Renders upload image button", () => {
        render(<UploadImageButton onUploadImage={() => { }} />);

        expect(screen.getByTestId("CldUploadButton")).toBeInTheDocument();
    });
});