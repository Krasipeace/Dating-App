"use client";

import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { updateMember, deleteMember } from "@/app/actions/adminActions";
import DeleteButton from "@/components/buttons/DeleteButton";
import { MemberEditModalProps, MemberInfo } from "@/types/memberProps";
import { CONFIRM_DELETE_MEMBER, FAILED_TO_DELETE_MEMBER, FAILED_TO_UPDATE_MEMBER, SUCCESS_TO_DELETE_MEMBER, SUCCESS_TO_UPDATE_MEMBER } from "@/constants/actionConstants";

import { useEffect } from "react";

export default function EditUsersInfo({ members }: MemberEditModalProps) {
    const [selectedMember, setSelectedMember] = useState<MemberInfo | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    const handleEditClick = (member: MemberInfo) => {
        setSelectedMember(member);
        setModalOpen(true);
    };

    const handleUpdate = async () => {
        if (selectedMember) {
            try {
                await updateMember(selectedMember.id, selectedMember);
                alert(SUCCESS_TO_UPDATE_MEMBER);
                setModalOpen(false);
            } catch (error) {
                console.error(error);
                alert(FAILED_TO_UPDATE_MEMBER);
            }
        }
    };

    const handleDelete = async (memberId: string) => {
        if (confirm(CONFIRM_DELETE_MEMBER)) {
            try {
                await deleteMember(memberId);
                alert(SUCCESS_TO_DELETE_MEMBER);
            } catch (error) {
                console.error(error);
                alert(FAILED_TO_DELETE_MEMBER);
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
                                <button onClick={() => handleEditClick(member)} className="btn btn-primary">
                                    Edit
                                </button>
                                <DeleteButton loading={false} onClick={() => handleDelete(member.id)} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No members found</p>
            )}

            {isModalOpen && selectedMember && (
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <ModalHeader>Edit Member</ModalHeader>
                    <ModalBody>
                        <form>
                            {Object.keys(selectedMember as MemberInfo)
                                .filter((key) => !["id", "userId", "birthDate"].includes(key))
                                .map((key) => (
                                    <div key={key} className="mb-4">
                                        <label htmlFor={key} className="block font-medium capitalize">
                                            {key}
                                        </label>
                                        <input
                                            type="text"
                                            id={key}
                                            value={(selectedMember[key as keyof MemberInfo] as string) || ""}
                                            onChange={(e) =>
                                                setSelectedMember({
                                                    ...selectedMember,
                                                    [key]: e.target.value,
                                                } as MemberInfo)
                                            }
                                            className="w-full px-2 py-1 border rounded-md"
                                        />
                                    </div>
                                ))}
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleUpdate}>
                            Save
                        </button>
                    </ModalFooter>
                </Modal>
            )}
        </div>
    );
}
