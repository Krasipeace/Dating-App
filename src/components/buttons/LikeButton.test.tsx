import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LikeButton from "./LikeButton";


describe("LikeButton component tests", () => {
    it("renders 1st like classes on icon when hasLiked is false", () => {
        render(<LikeButton loading={false} hasLiked={false} toggleLike={() => { }} />);
        expect(screen.queryByTestId("IoMdHeart")).toHaveClass("fill-neutral-500/70");
    });

    it("renders 2nd like classes on icon when hasLiked is true", () => {
        render(<LikeButton loading={false} hasLiked={true} toggleLike={() => { }} />);
        expect(screen.queryByTestId("IoMdHeart")).toHaveClass("fill-rose-500");
    });

    it("renders spinner icon when loading is true", () => {
        render(<LikeButton loading={true} hasLiked={false} toggleLike={() => { }} />);
        expect(screen.queryByTestId("PiSpinnerGapBold")).toBeInTheDocument();
    });

    it("has correct screen reader text when hasLiked is true", () => {
        render(<LikeButton loading={false} hasLiked={true} toggleLike={() => { }} />);
        expect(screen.getByText("Dislike")).toBeInTheDocument();
    });

    it("has correct screen reader text when hasLiked is false", () => {
        render(<LikeButton loading={false} hasLiked={false} toggleLike={() => { }} />);
        expect(screen.getByText("Like")).toBeInTheDocument();
    });
});