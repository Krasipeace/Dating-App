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
                    <table className="min-w-full table-auto border border-gray-300 shadow-md rounded-md">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Birth Date</th>
                                <th className="p-2 text-left">Gender</th>
                                <th className="p-2 text-left">Country</th>
                                <th className="p-2 text-left">City</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member.id} className="border-t border-gray-200">
                                    <td className="p-2">{member.name}</td>
                                    <td className="p-2">{member.birthDate.toLocaleDateString()}</td>
                                    <td className="p-2">{member.gender}</td>
                                    <td className="p-2">{member.country}</td>
                                    <td className="p-2">{member.city}</td>
                                    <td className="p-2 flex gap-2">
                                        <UserMessageToggleButton
                                            memberId={member.id}
                                            currentStatus={member.canSendMessages}
                                        />
                                        <DeleteButton onClick={() => handleDelete(member.id)} loading={false} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No members found</p>
            )}
        </div>
    );
}