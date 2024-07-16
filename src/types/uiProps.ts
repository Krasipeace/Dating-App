import { Member } from "@prisma/client";
import { ActionResult } from "@/types";

export type EditFormProps = {
    member: Member;
}

export type GifHandlerProps = {
    gifUrl: string;
    altText?: string;
    width?: string;
    height?: string;
}

export type MenuProps = {
    userInfo: {
        name: string | null;
        image: string | null;
    } | null;
    role?: string;
}

export type NavLinkProps = {
    href: string;
    label: string;
}

export type NotificationProps = {
    image?: string | null;
    href: string;
    title: string;
    sysMessage?: string;
}

export type PresenceIndicatorProps = {
    member: Member;
}

export type PresenceAvatarProps = {
    userId?: string;
    source?: string | null;
}

export type ResultMessageProps = {
    result: ActionResult<string> | null;
}