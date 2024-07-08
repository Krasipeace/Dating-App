import { getNonApprovedPhotos } from "@/app/actions/adminActions"
import MemberPhotos from "@/components/MemberPhotos";
import { Card } from "@nextui-org/react";

export default async function AdminPhotosPage() {
    const photos = await getNonApprovedPhotos();
    return (
        <>
            <div className="shadow-md flex flex-col items-center pb-2">
                <h3 className="italic">Images awaiting approval</h3>
            </div>
            <Card>
                <MemberPhotos photos={photos} />
            </Card>
        </>
    )
}