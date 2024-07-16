import { longStringHandler, transformImageUrl } from "@/lib/utilities";
import { MessageDto } from "@/types";
import { NotificationProps as NotificationProps } from "@/types/uiProps";
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function NotificationToast({ image, href, title, sysMessage: sysMessage }: NotificationProps) {
    return (
        <Link href={href} className="flex items-center">
            <div className="mr-2">
                <Image
                    src={transformImageUrl(image) || "/images/user.png"}
                    height={50}
                    width={50}
                    alt="User Avatar"
                />
            </div>
            <div className="flex flex-grow flex-col justify-center">
                <div className="font-semibold">{title}</div>
                <div className="text-sm">{sysMessage || "Click to view"}</div>
            </div>
        </Link>
    )
}

export const messageNotification = (message: MessageDto) => {
    toast(
        <NotificationToast
            image={message.senderImage}
            href={`/members/${message.senderId}/chat`}
            title={`${longStringHandler(message.senderName as string)} just sent you a new message`}
        />
    )
}

export const likeNotification = (name: string, image: string | null, userId: string) => {
    toast(
        <NotificationToast
            image={image}
            href={`/members/${userId}`}
            title={`${longStringHandler(name)} just liked you`}
            sysMessage="Check profile"
        />
    )
}