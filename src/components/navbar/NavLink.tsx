"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";

import type { NavLinkProps } from "@/types/NavLinkProps";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }: NavLinkProps) {
    const pathName = usePathname();

    return (
        <NavbarItem isActive={pathName === href} as={Link} href={href}>{label}</NavbarItem>
    )
}