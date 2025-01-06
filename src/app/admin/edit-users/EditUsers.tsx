import { deleteMember, updateChatPossibility } from "@/app/actions/adminActions";
import DeleteButton from "@/components/buttons/DeleteButton";
import { CONFIRM_DELETE_MEMBER, FAILED_TO_DELETE_MEMBER, FAILED_TO_UPDATE_MESSAGE_POSSIBILITY, SUCCESS_TO_DELETE_MEMBER } from "@/constants/actionConstants";
import { MemberEditModalProps } from "@/types/memberProps";
import { toast } from "react-toastify";

export default function EditUsersInfo({ members }: MemberEditModalProps) {
    const handleToggleMessaging = async (memberId: string, currentStatus: boolean) => {
        try {
            await updateChatPossibility(memberId, !currentStatus);
            toast.success(`Messaging ${!currentStatus ? "enabled" : "disabled"} for the user.`);
        } catch (error) {
            console.error(error);
            toast.warning(FAILED_TO_UPDATE_MESSAGE_POSSIBILITY);
        }
    };

    const handleDelete = async (memberId: string) => {
        if (confirm(CONFIRM_DELETE_MEMBER)) {
            try {
                await deleteMember(memberId);
                toast.success(SUCCESS_TO_DELETE_MEMBER);
            } catch (error) {
                console.error(error);
                toast.warning(FAILED_TO_DELETE_MEMBER);
            }
        }
    };

    return (
        <div>
            {members.length > 0 ? (
                <div>
                    {members.map((member) => (
                        <div key={member.id} className="flex justify-between items-center p-2 shadow-md rounded-md">
                            <p className="font-serif">{member.name}</p>
                            <div className="flex gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleToggleMessaging(member.userId, member.canSendMessages)}
                                >
                                    {member.canSendMessages ? "Disable Messaging" : "Enable Messaging"}
                                </button>
                                <DeleteButton loading={false} onClick={() => handleDelete(member.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No members found</p>
            )}
        </div>
    );
}
