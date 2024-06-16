import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import MemberPhotos from "@/components/MemberPhotos";
import { CardHeader, Divider, CardBody } from "@nextui-org/react"

export default async function PhotosPage({ params }: { params: { userId: string } }) {
    const member = await getMemberByUserId(params.userId);
    const photos = await getMemberPhotosByUserId(params.userId);

    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">{member?.name}&#39;s Photos</CardHeader>
            <Divider />
            <CardBody>
                <MemberPhotos photos={photos} />
            </CardBody>
        </>
    )
}