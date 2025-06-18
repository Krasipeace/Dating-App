"use client"

import { signOutUser } from "@/app/actions/authActions";
import { transformImageUrl } from "@/lib/utilities";
import { MenuProps } from "@/types/uiProps";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/react";
import Link from "next/link";
import { FaUsersCog } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { TbLogs, TbMessageSearch, TbPhotoSearch } from "react-icons/tb";

/**
 * AdminMenu component
 * @param {MenuProps} { userInfo }
 * @returns {JSX.Element} AdminMenu component
 * @description AdminMenu component to display admin menu
 * @example
 *   <AdminMenu userInfo={userInfo} />
 * @see MenuProps
 */
export default function AdminMenu({ userInfo }: MenuProps) {
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
                <DropdownItem as={Link} href="/admin/logs" endContent={<TbLogs size={20} className="text-blue-800" />}>
                    Check Logs
                </DropdownItem>
                <DropdownItem as={Link} href="/admin/edit-users" endContent={<FaUsersCog size={20} className="text-blue-800" />}>
                    Edit Users
                </DropdownItem>
                <DropdownItem as={Link} href="/admin/messages" endContent={<TbMessageSearch size={20} className="text-blue-800" />}>
                    Reported Messages
                </DropdownItem>
                <DropdownItem as={Link} href="/admin/photos" endContent={<TbPhotoSearch size={20} className="text-blue-800" />}>
                    User&apos;s photos
                </DropdownItem>
                <DropdownItem color="danger" onClick={async () => signOutUser()} endContent={<GiExitDoor size={20} className="text-blue-800" />}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}