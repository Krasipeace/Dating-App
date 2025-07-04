"use client";

import useMessageStore from "@/hooks/useMessageStore";
import { Chip } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdMoveToInbox, MdOutbox } from "react-icons/md";

export default function MessageSidebar() {
    const { unreadCount } = useMessageStore(state => ({
        unreadCount: state.unreadCount
    }));
    const searchParams = useSearchParams();
    const [selected, setSelected] = useState<string>(searchParams.get("container") || "inbox");
    const router = useRouter();
    const pathname = usePathname();

    const items = [
        {
            key: "inbox",
            label: "Inbox",
            icon: MdMoveToInbox,
            chip: true
        },
        {

            key: "outbox",
            label: "Outbox",
            icon: MdOutbox,
            chip: false
        }
    ];

    const handleSelect = (key: string) => {
        setSelected(key);
        const params = new URLSearchParams();
        params.set("container", key);
        router.replace(`${pathname}?${params}`);
    }

    return (
        <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
            {items.map(({ key, icon: Icon, label, chip }) => (
                <div
                    key={key}
                    className={`${selected === key
                        ? "flex flex-row items-center rounded-t-lg gap-2 p-3 text-secondary font-semibold"
                        : "flex flex-row items-center rounded-t-lg gap-2 p-3 text-black hover:text-secondary/70"}`}
                    onClick={() => { handleSelect(key) }}
                >
                    <Icon size={24} aria-hidden="true" />
                    <div className="flex justify-between flex-grow">
                        <span>{label}</span>
                        {chip && <Chip aria-label="Unread messages:">{unreadCount}</Chip>}
                    </div>
                </div>
            ))}
        </div>
    )
}