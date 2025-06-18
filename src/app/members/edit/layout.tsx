import { getMemberByUserId } from "@/app/actions/memberActions";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Card } from "@heroui/react";
import MemberSidebar from "../memberSidebar";
import { getAuthUserId } from "@/app/actions/authActions";

export default async function Layout({ children }: { children: ReactNode }) {
    const userId = await getAuthUserId();

    const member = await getMemberByUserId(userId);
    if (!member) return notFound();

    const basePath = `/members/edit`;

    const navLinks = [
        { name: "My Profile", href: `${basePath}` },
        { name: "My Photos", href: `${basePath}/photos` },
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