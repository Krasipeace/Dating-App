import { Member } from "@prisma/client";

export type MemberCardProps = {
    member: Member;
    likeIds: string[];
}