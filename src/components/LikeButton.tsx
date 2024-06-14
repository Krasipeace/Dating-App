"use client";

import { toggleLikeMember } from "@/app/actions/likeActions";
import { LikeButtonProps } from "@/types/likeButtonProps";
import { useRouter } from "next/navigation";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

export default function LikeButton({ targetId, hasLiked }: LikeButtonProps) {
    const router = useRouter();

    async function toggleLike() {
        await toggleLikeMember(targetId, hasLiked);
        router.refresh();
    }

    return (
        <div onClick={toggleLike} className="relative hover:opacity-80 transition cursor-pointer">
            <IoMdHeartEmpty size={28} className="fill-white absolute -top-[2px] -right[2px]" />
            <IoMdHeart size={24} className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"} />
        </div>
    )
}