"use client";

import { LikeButtonProps } from "@/types/buttonProps";
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
                <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer">
                    <IoMdHeartEmpty size={28} className="fill-white absolute -top-[2px] -right[2px]" data-testid="IoMdHeartEmpty" />
                    <IoMdHeart size={26} className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"} data-testid="IoMdHeart" />
                </div>
            ) : (
                <PiSpinnerGapBold color="warning" size={30} className="animate-spin" data-testid="PiSpinnerGapBold" />
            )}
        </>
    )
}