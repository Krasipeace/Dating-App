import { Member } from "@prisma/client";

export type LikeTabProps = {
    members: Member[];
    likeIds: string[];
}

interface User {
    id: string;
    name: string;
    _count?: {
        targetLikes?: number;
    };
}

export interface TopLikedUsersTableProps {
    users: User[];
}