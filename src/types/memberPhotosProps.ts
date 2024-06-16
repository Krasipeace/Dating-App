import { Photo } from "@prisma/client";

export type MemberPhotosProps = {
    photos: Photo[] | null;
    editing?: boolean;
    mainImageUrl?: string | null;
}