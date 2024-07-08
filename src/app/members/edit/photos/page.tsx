import { getAuthUserId } from "@/app/actions/authActions";
import { getMemberByUserId, getMemberPhotosByUserId } from "@/app/actions/memberActions";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";
import CardWrapper from "@/components/CardWrapper";

export default async function PhotosPage() {
    const userId = await getAuthUserId();
    const member = await getMemberByUserId(userId);
    const photos = await getMemberPhotosByUserId(userId);

    return (
        <>
            <CardWrapper
                header={
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className='text-2xl font-semibold text-secondary'>
                            {member?.name}&#39;s Photos
                        </div>
                        <MemberPhotoUpload />
                    </div>
                }
                body={
                    <MemberPhotos photos={photos} editing={true} mainImageUrl={member?.image} />
                }
            />
        </>
    )
}