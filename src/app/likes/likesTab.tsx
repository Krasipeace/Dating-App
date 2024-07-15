"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useTransition } from "react";
import MemberCard from "../members/memberCard";
import LoadingComponent from "@/components/LoadingComponent";
import { LikeTabProps } from "@/types/likeProps";

export default function LikesTab({ members, likeIds }: LikeTabProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const tabs = [
        { id: "source", label: "People I have Liked" },
        { id: "target", label: "People that like me" },
        { id: "mutual", label: "Mutual likes" }
    ];

    function handleTabChange(key: Key) {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            params.set("type", key.toString());
            router.replace(`${pathname}?${params.toString()}`);
        })
    }

    return (
        <div className="flex w-full flex-col mt-1 gap-5 items-center">
            <Tabs
                aria-label="Dynamic selector for likes"
                items={tabs}
                color="secondary"
                onSelectionChange={(key) => handleTabChange(key)}
            >
                {(item => (
                    <Tab key={item.id} title={item.label}>
                        {isPending ? (
                            <LoadingComponent />
                        ) : (
                            <>
                                {members.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                                        {members.map(member => (
                                            <MemberCard key={member.id} member={member} likeIds={likeIds} />
                                        ))}
                                    </div>
                                ) : (
                                    <div>No likes yet.</div>
                                )}
                            </>
                        )}
                    </Tab>
                ))}
            </Tabs>
        </div>
    )
}