import { getNonApprovedPhotos } from "@/app/actions/adminActions"
import MemberPhotos from "@/components/MemberPhotos";
import { Card } from "@heroui/react";

export const dynamic = "force-dynamic";

export default async function AdminPhotosPage() {
    const photos = await getNonApprovedPhotos();

    return (
        <>
            <div className="shadow-md flex flex-col items-center pb-2">
                <h3 className="italic">Images awaiting approval</h3>
            </div>
            <Card className="pb-7">
                <MemberPhotos photos={photos} />
            </Card>
        </>
    )
}