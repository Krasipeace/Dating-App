import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LikeButton from "./LikeButton";


describe("LikeButton component tests", () => {
    it("Renders 1st like classes on icon when hasLiked is false", () => {
        render(<LikeButton loading={false} hasLiked={false} toggleLike={() => { }} />);

        expect(screen.queryByTestId("IoMdHeart")).toHaveClass("fill-neutral-500/70");
    });

    it("Renders 2nd like classes on icon when hasLiked is true", () => {
        render(<LikeButton loading={false} hasLiked={true} toggleLike={() => { }} />);

        expect(screen.queryByTestId("IoMdHeart")).toHaveClass("fill-rose-500");
    });

    it("Renders spinner icon when loading is true", () => {
        render(<LikeButton loading={true} hasLiked={false} toggleLike={() => { }} />);

        expect(screen.queryByTestId("PiSpinnerGapBold")).toBeInTheDocument();
    });
});