"use client"

import { signOutUser } from "@/app/actions/authActions";
import { UserMenuProps } from "@/types/userMenuProps";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";

export default function UserMenu({ user }: UserMenuProps) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={user?.name || "user avatar"}
                    size="sm"
                    src={user?.image || "/images/user.png"}
                />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
                        Logged in as {user?.name}
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem as={Link} href="/members/edit">
                    Edit profile
                </DropdownItem>
                <DropdownItem color="danger" onClick={async () => signOutUser()}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}