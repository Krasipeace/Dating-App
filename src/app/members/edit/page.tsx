import EditForm from "./EditForm";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import CardWrapper from "@/components/CardWrapper";

export default async function ProfileEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);

    if (!member) return notFound();

    return (
        <>
            <CardWrapper
                header={<div className="text-2xl font-semibold text-secondary">{member?.name}&#39;s profile details</div>}
                body={<EditForm member={member} />}
            />
        </>
    )
}