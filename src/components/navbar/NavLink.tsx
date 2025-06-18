"use client";

import { NavbarItem } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useMessageStore from "@/hooks/useMessageStore";
import { NavLinkProps } from "@/types/uiProps";

/**
 * NavLink component
 * @param {NavLinkProps} { href, label }
 * @returns {JSX.Element} NavLink component
 * @description NavLink component to display a navigation link
 * @example
 *   <NavLink href={href} label={label} />
 * @see NavLinkProps
 */
export default function NavLink({ href, label }: NavLinkProps) {
    const pathName = usePathname();
    const { unreadCount } = useMessageStore(state => ({
        unreadCount: state.unreadCount
    }))

    return (
        <NavbarItem isActive={pathName === href} as={Link} href={href} aria-label={label}>
            <span>{label}</span>
            {href === "/messages" && unreadCount > 0 && (
                <span className="ml-1">({unreadCount})</span>
            )}
        </NavbarItem>
    )
}