"use client";

import { LikeButtonProps } from "@/types/buttonProps";
import { Tooltip } from "@nextui-org/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { PiSpinnerGapBold } from "react-icons/pi";

/**
 * LikeButton component
 * @param {LikeButtonProps} { loading, hasLiked, toggleLike }
 * @returns {JSX.Element} LikeButton component
 * @description LikeButton component to like or unlike a post
 * @example
 *   <LikeButton loading={loading} hasLiked={hasLiked} toggleLike={toggleLike} />
 * @see LikeButtonProps
 */
export default function LikeButton({ loading, hasLiked, toggleLike }: LikeButtonProps) {
    return (
        <>
            {!loading ? (
                <Tooltip content={hasLiked ? "Dislike" : "Like"} placement="top" aria-live="polite">
                    <button
                        onClick={toggleLike}
                        className="relative hover:opacity-80 transition cursor-pointer"
                        aria-label={hasLiked ? "Dislike" : "Like"}
                        aria-pressed={hasLiked}
                        aria-describedby="like-tooltip"
                    >
                        <IoMdHeartEmpty
                            size={28}
                            className="fill-white absolute -top-[2px] -right[2px]"
                            aria-hidden="true"
                            data-testid="IoMdHeartEmpty"
                        />
                        <IoMdHeart
                            size={26}
                            className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"} aria-hidden="true"
                            data-testid="IoMdHeart"
                        />
                    </button>
                </Tooltip>
            ) : (
                <PiSpinnerGapBold color="warning" size={30} className="animate-spin" data-testid="PiSpinnerGapBold" aria-label="Loading" />
            )}

            {/* screen readers */}
            <div
                id="like-tooltip"
                style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(1px, 1px, 1px, 1px)",
                    whiteSpace: "nowrap",
                }}
            >
                {hasLiked ? "Dislike" : "Like"}
            </div>
        </>
    )
}