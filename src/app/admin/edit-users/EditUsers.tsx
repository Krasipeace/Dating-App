"use client";

import DeleteButton from "@/components/buttons/DeleteButton";
import { CONFIRM_DELETE_MEMBER, FAILED_TO_DELETE_MEMBER, SUCCESS_TO_DELETE_MEMBER } from "@/constants/actionConstants";
import { MemberEditModalProps } from "@/types/memberProps";
import { toast } from "react-toastify";
import { deleteMember } from "@/app/actions/adminActions";
import UserMessageToggleButton from "@/components/buttons/UserMessageToggleButton";

export default function EditUsersInfo({ members }: MemberEditModalProps) {
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
                            <span>{member.name}</span>
                            <UserMessageToggleButton
                                memberId={member.id}
                                currentStatus={member.canSendMessages}
                            />
                            <DeleteButton onClick={() => handleDelete(member.id)} loading={false} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No members found</p>
            )}
        </div>
    );
}