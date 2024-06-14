import { Member } from "@prisma/client"

export type LikeTabProps = {
    members: Member[];
    likeIds: string[];
}