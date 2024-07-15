"use client"

import { signOutUser } from "@/app/actions/authActions";
import { transformImageUrl } from "@/lib/utilities";
import { MenuProps } from "@/types/uiProps";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";
import { GiExitDoor } from "react-icons/gi";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlinePhotoLibrary } from "react-icons/md";

export default function UserMenu({ userInfo }: MenuProps) {
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
                    src={transformImageUrl(userInfo?.image) || "/images/user.png"}
                />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
                        Logged in as <span className="font-semibold">{userInfo?.name}</span>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem as={Link} href="/members/edit" endContent={<LiaUserEditSolid size={20} className="text-purple-800" />}>
                    Profile
                </DropdownItem>
                <DropdownItem as={Link} href="/members/edit/photos" endContent={<MdOutlinePhotoLibrary size={20} className="text-purple-800" />}>
                    Photos
                </DropdownItem>
                <DropdownItem color="danger" onClick={async () => signOutUser()} endContent={<GiExitDoor size={20} className="text-purple-800" />}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}