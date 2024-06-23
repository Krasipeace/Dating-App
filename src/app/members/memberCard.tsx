"use client";

import LikeButton from "@/components/LikeButton";
import PresenceIndicator from "@/components/PresenceIndicator";
import { calculateAge, longNameHandler, transformImageUrl } from "@/lib/utilities";
import { MemberCardProps } from "@/types/memberCardProps";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

export default function MemberCard({ member, likeIds }: MemberCardProps) {
    const hasLiked = likeIds.includes(member.userId);

    const preventLinkAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Card
            fullWidth
            as={Link}
            href={`/members/${member.userId}`}
            isPressable
        >
            <Image
                isZoomed
                alt={member.name}
                width={300}
                src={transformImageUrl(member.image) || "/images/user.png"}
                className="aspect-square object-cover"
            />
            <div onClick={preventLinkAction}>
                <div className="absolute top-3 right-3 z-50">
                    <LikeButton targetId={member.userId} hasLiked={hasLiked} />
                </div>
                <div className="absolute top-2 left-3 z-50">
                    <PresenceIndicator member={member} />
                </div>
            </div>
            <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
                <div className="flex flex-col text-white">
                    <span className="font-semibold">{longNameHandler(member)}, {calculateAge(member.birthDate)}</span>
                    <span className="text-sm">{member.city}</span>
                </div>
            </CardFooter>
        </Card>
    )
}