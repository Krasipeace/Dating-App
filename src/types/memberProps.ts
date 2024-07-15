import { Member } from "@prisma/client";
import { Photo } from "@prisma/client";

export type MemberCardProps = {
    member: Member;
    likeIds: string[];
}

export type MemberImageProps = {
    photo: Photo | null;
}

export type MemberPhotosProps = {
    photos: Photo[] | null;
    editing?: boolean;
    mainImageUrl?: string | null;
}

export type MemberSidebarProps = {
    member: Member;
    navLinks: { name: string, href: string }[];
}