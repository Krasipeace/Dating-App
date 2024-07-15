import usePresenceStore from "@/hooks/usePresenceStore";
import { PresenceAvatarProps } from "@/types/uiProps";
import { Avatar, Badge } from "@nextui-org/react";

export default function PresenceAvatar({ userId, source }: PresenceAvatarProps) {
    const { members } = usePresenceStore(state => ({
        members: state.members
    }));

    const isOnline = userId && members.indexOf(userId) !== -1;

    return (
        <Badge content="" color="success" shape="circle" isInvisible={!isOnline}>
            <Avatar src={source || "/images/user.png"} alt="User Avatar" />
        </Badge>
    )
}