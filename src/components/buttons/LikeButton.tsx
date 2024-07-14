"use client";

import { LikeButtonProps } from "@/types/likeButtonProps";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { PiSpinnerGapBold } from "react-icons/pi";

export default function LikeButton({ loading, hasLiked, toggleLike }: LikeButtonProps) {
    return (
        <>
            {!loading ? (
                <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer">
                    <IoMdHeartEmpty size={28} className="fill-white absolute -top-[2px] -right[2px]" />
                    <IoMdHeart size={26} className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"} />
                </div>
            ) : (
                <PiSpinnerGapBold color="warning" size={30} className="animate-spin" />
            )}
        </>
    )
}