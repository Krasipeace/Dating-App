import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import EditForm from "./EditForm";
import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";

export default async function ProfileEditPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);

    if (!member) return notFound();

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">{member?.name}&#39;s details</CardHeader>
            <Divider />
            <CardBody>
                <EditForm member={member} />
            </CardBody>
        </>
    )
}