import usePresenceStore from "@/hooks/usePresenceStore";
import { PresenceIndicatorProps } from "@/types/uiProps";
import { GoDot, GoDotFill } from "react-icons/go";

/**
 * PresenceIndicator component
 * @param {PresenceIndicatorProps} { member }
 * @returns {JSX.Element} PresenceIndicator component
 * @description PresenceIndicator component to display the presence of a member
 * @example
 *   <PresenceIndicator member={member} />
 * @see PresenceIndicatorProps
 */
export default function PresenceIndicator({ member }: PresenceIndicatorProps) {
    const { members } = usePresenceStore(state => ({
        members: state.members
    }))

    const isOnline = members.indexOf(member.userId) !== -1;

    if (!isOnline) return null;

    return (
        <div aria-label="Indicator - User is online">
            <GoDot size={36} className="fill-white absolute -top-[2px] -right-[2px]" aria-hidden="true" />
            <GoDotFill size={32} className="fill-green-600 animate-pulse" aria-hidden="true" />
        </div>
    )
}