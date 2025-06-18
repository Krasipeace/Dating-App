"use client"

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import Link from "next/link";
import { GiExitDoor } from "react-icons/gi";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { signOutUser } from "@/app/actions/authActions";
import { transformImageUrl } from "@/lib/utilities";
import { MenuProps } from "@/types/uiProps";

/**
 * UserMenu component
 * @param {MenuProps} { userInfo }
 * @returns {JSX.Element} UserMenu component
 * @description UserMenu component to display user menu
 * @example
 *   <UserMenu userInfo={userInfo} />
 * @see MenuProps
 */
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
                    aria-label="Your profile picture"
                />
            </DropdownTrigger>
            <DropdownMenu variant="flat" aria-label="User actions menu">
                <DropdownSection showDivider>
                    <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="Your username">
                        Logged in as <span className="font-semibold">{userInfo?.name}</span>
                    </DropdownItem>
                </DropdownSection>
                <DropdownItem
                    as={Link}
                    href="/members/edit"
                    endContent={<LiaUserEditSolid size={20} className="text-purple-800" />}
                    aria-label="Click to go to Edit your profile"
                >
                    Profile
                </DropdownItem>
                <DropdownItem
                    as={Link}
                    href="/members/edit/photos"
                    endContent={<MdOutlinePhotoLibrary size={20} className="text-purple-800" />}
                    aria-label="Click to go to Edit your photos"
                >
                    Photos
                </DropdownItem>
                <DropdownItem
                    color="danger"
                    onClick={async () => signOutUser()}
                    endContent={<GiExitDoor size={20} className="text-purple-800" />}
                    aria-label="Click to log out"
                >
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}