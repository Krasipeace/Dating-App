"use client";

import { calculateAge, calculateNameLength, transformImageUrl } from "@/lib/utilities";
import { MemberSidebarProps } from "@/types/memberSidebarProps";
import { Button, Card, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function MemberSidebar({ member, navLinks }: MemberSidebarProps) {
    const pathname = usePathname();

    return (
        <Card className="w-full mt-10 items-center h-[70vh]">
            <Image
                height={200}
                width={200}
                src={transformImageUrl(member.image) || "/images/user.png"}
                alt="User profile avatar"
                className="rounded-full mt-6 aspect-square object-cover"
            />
            <CardBody>
                <div className="flex flex-col items-center">
                    <div className={calculateNameLength(member)}>
                        {member.name}, {calculateAge(member.birthDate)}
                    </div>
                    <div className="text-sm text-neutral-500">
                        {member.city}, {member.country}
                    </div>
                </div>
                <Divider className="my-3" />
                <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
                    {navLinks.map(link => (
                        <Link
                            href={link.href}
                            key={link.name}
                            className={`block rounded ${pathname === link.href ? "text-secondary" : "hover:text-secondary-300"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </CardBody>
            <CardFooter>
                <Button
                    as={Link}
                    href="/members"
                    fullWidth
                    color="secondary"
                    variant="bordered"
                    startContent={<IoChevronBackCircleOutline size={20} />}
                >
                    Go back
                </Button>
            </CardFooter>
        </Card>
    )
}