import usePresenceStore from "@/hooks/usePresenceStore";
import { PresenceIndicatorProps } from "@/types/presenceIndicatorProps";
import { GoDot, GoDotFill } from "react-icons/go";

export default function PresenceIndicator({ member }: PresenceIndicatorProps) {
    const { members } = usePresenceStore(state => ({
        members: state.members
    }))

    const isOnline = members.indexOf(member.userId) !== -1;

    if (!isOnline) return null;

    return (
        <>
            <GoDot size={36} className="fill-white absolute -top-[2px] -right-[2px]" />
            <GoDotFill size={32} className="fill-green-600 animate-pulse" />
        </>
    )
}