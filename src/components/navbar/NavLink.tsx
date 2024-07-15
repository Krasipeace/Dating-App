"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMessageStore from "@/hooks/useMessageStore";
import { NavLinkProps } from "@/types/uiProps";

export default function NavLink({ href, label }: NavLinkProps) {
    const pathName = usePathname();
    const { unreadCount } = useMessageStore(state => ({
        unreadCount: state.unreadCount
    }))

    return (
        <NavbarItem isActive={pathName === href} as={Link} href={href}>
            <span>{label}</span>
            {href === "/messages" && unreadCount > 0 && (
                <span className="ml-1">({unreadCount})</span>
            )}
        </NavbarItem>
    )
}