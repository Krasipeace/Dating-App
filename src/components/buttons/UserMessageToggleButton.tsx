import React from "react";
import { updateChatPossibility } from "@/app/actions/adminActions";
import { toast } from "react-toastify";
import { FAILED_TO_UPDATE_MESSAGE_POSSIBILITY } from "@/constants/actionConstants";
import { UserMessageToggleButtonProps } from "@/types/buttonProps";

/**
 * UserMessageToggleButton component
 * @param {UserMessageToggleButtonProps} { memberId, currentStatus }
 * @returns {JSX.Element} UserMessageToggleButton component
 * @description UserMessageToggleButton component to toggle messaging for a user
 * @example
 *   <UserMessageToggleButton memberId={memberId} currentStatus={currentStatus} />
 * @see UserMessageToggleButtonProps
 */
export default function UserMessageToggleButton({ memberId, currentStatus }: UserMessageToggleButtonProps ) {
    const handleToggleMessaging = async () => {
        try {
            await updateChatPossibility(memberId, !currentStatus);
            toast.success(`Messaging ${!currentStatus ? "enabled" : "disabled"} for the user.`);
        } catch (error) {
            console.error(error);
            toast.warning(FAILED_TO_UPDATE_MESSAGE_POSSIBILITY);
        }
    };

    return (
        <button onClick={handleToggleMessaging}>
            {currentStatus ? "Disable Messaging" : "Enable Messaging"}
        </button>
    );
}