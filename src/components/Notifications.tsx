import { longStringHandler, transformImageUrl } from "@/lib/utilities";
import { MessageDto } from "@/types";
import { NotificationProps } from "@/types/uiProps";
import { Image } from "@heroui/react";
import Link from "next/link";
import { toast } from "react-toastify";

/**
 * NotificationToast component
 * @param {NotificationProps} { image, href, title, sysMessage: sysMessage }
 * @returns {JSX.Element} NotificationToast component
 * @description NotificationToast component to display a notification toast
 * @example
 *   <NotificationToast
 *       image={image}
 *       href={href}
 *       title={title}
 *       sysMessage={sysMessage}
 *   />
 * @see NotificationProps
 */
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

/**
 * Displays a toast notification for a new message.
 * @param {MessageDto} message - The message data transfer object containing message details.
 * @returns {void}
 * @example
 *   messageNotification(message);
 */
export const messageNotification = (message: MessageDto) => {
    toast(
        <NotificationToast
            image={message.senderImage}
            href={`/members/${message.senderId}/chat`}
            title={`${longStringHandler(message.senderName as string)} just sent you a new message`}
        />
    )
}

/**
 * Displays a toast notification for a new like.
 * @param {string} name - The name of the user who liked.
 * @param {string | null} image - The image URL of the user who liked.
 * @param {string} userId - The user ID of the user who liked.
 * @returns {void}
 * @example
 *   likeNotification(name, image, userId);
 */
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