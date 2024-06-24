"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import type { NavLinkProps } from "@/types/navLinkProps";
import { usePathname } from "next/navigation";
import useMessageStore from "@/hooks/useMessageStore";

export default function NavLink({ href, label }: NavLinkProps) {
    const pathName = usePathname();
    const { unreadCount } = useMessageStore(state => ({
        unreadCount: state.unreadCount
    }))

    return (
        <NavbarItem isActive={pathName === href} as={Link} href={href}>
            <span>{label}</span>
            {href === "/messages" && (<span className="ml-1">({unreadCount})</span>)}
        </NavbarItem>
    )
}