import { getNonApprovedPhotos } from "@/app/actions/adminActions"
import MemberPhotos from "@/components/MemberPhotos";

export default async function AdminPhotosPage() {
    const photos = await getNonApprovedPhotos();
    return (
        <div className="shadow-md flex flex-col items-center pb-2">
            <h3>User&apos;s photos awaiting approval</h3>
            <MemberPhotos photos={photos} />
        </div>
    )
}