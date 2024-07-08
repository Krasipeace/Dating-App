import { getMemberPhotosByUserId } from "@/app/actions/memberActions";
import CardWrapper from "@/components/CardWrapper";
import MemberPhotos from "@/components/MemberPhotos";

export default async function PhotosPage({ params }: { params: { userId: string } }) {
    const photos = await getMemberPhotosByUserId(params.userId);

    return (
        <>
            <CardWrapper
                header="Photos"
                body={
                    <div>
                        <MemberPhotos photos={photos} />
                    </div>
                }
            />
        </>
    )
}