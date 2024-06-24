import { transformImageUrl } from "@/lib/utilities"
import { MessageDto } from "@/types"
import { NewMessageToastProps } from "@/types/newMessageToastProps"
import { Image } from "@nextui-org/react"
import Link from "next/link"
import { PiMailboxFill } from "react-icons/pi"
import { toast } from "react-toastify"

export default function NewMessageToast({ message }: NewMessageToastProps) {
    return (
        <Link href={`/members/${message.senderId}/chat`} className="flex items-center">
            <div className="mr-2">
                <Image
                    src={transformImageUrl(message.senderImage) || "/images/user.png"}
                    height={50}
                    width={50}
                    alt="Sender Avatar"
                />
            </div>
            <div className="flex flex-grow flex-col justify-items-center">
                <div className="font-semibold">
                    {message.senderName} just sent you a message
                </div>
                <div className="text-sm">
                    Click to view <PiMailboxFill size={16} color="blue" />
                </div>
            </div>
        </Link>
    )
}

export const newMessageToast = (message: MessageDto) => {
    toast(<NewMessageToast message={message} />)
}