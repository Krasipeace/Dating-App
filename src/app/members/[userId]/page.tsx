import { getMemberByUserId } from "@/app/actions/memberActions"
import CardWrapper from "@/components/CardWrapper";
import { notFound } from "next/navigation";

export default async function MemberDetailsPage({ params }: { params: { userId: string } }) {
    const member = await getMemberByUserId(params.userId);

    if (!member) return notFound();

    return (
        <CardWrapper header="Profile" body={<div>{member.description}</div>} />
    )
}