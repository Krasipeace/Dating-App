import { getMemberByUserId } from "@/app/actions/memberActions";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Card } from "@heroui/react";
import MemberSidebar from "../memberSidebar";

export default async function Layout({ children, params }: { children: ReactNode, params: { userId: string } }) {
    const member = await getMemberByUserId(params.userId);
    if (!member) return notFound();

    const basePath = `/members/${member.userId}`;

    const navLinks = [
        { name: "Profile", href: `${basePath}` },
        { name: "Photos", href: `${basePath}/photos` },
        { name: "Chat", href: `${basePath}/chat` },
    ];

    return (
        <div className="grid grid-cols-12 gap-5 h-[70vh]">
            <div className="col-span-3">
                <MemberSidebar member={member} navLinks={navLinks} />
            </div>
            <div className="col-span-9">
                <Card className="w-full mt-10 h-[70vh]">
                    {children}
                </Card>
            </div>
        </div>
    )
}