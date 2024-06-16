"use client"

import { signOutUser } from "@/app/actions/authActions";
import { UserMenuProps } from "@/types/userMenuProps";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import { GiExitDoor } from "react-icons/gi";
import { LiaUserEditSolid } from "react-icons/lia";

export default function UserMenu({ userInfo }: UserMenuProps) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={userInfo?.name || "user avatar"}
                    size="sm"
                    src={userInfo?.image || "/images/user.png"}
                />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
                        Logged in as <span className="font-semibold">{userInfo?.name}</span>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem as={Link} href="/members/edit" endContent={<LiaUserEditSolid size={20} />}>
                    Edit profile
                </DropdownItem>
                <DropdownItem color="danger" onClick={async () => signOutUser()} endContent={<GiExitDoor size={20} />}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}