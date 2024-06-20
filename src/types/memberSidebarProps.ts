import { Member } from "@prisma/client";

export type MemberSidebarProps = {
    member: Member;
    navLinks: { name: string, href: string }[];
}