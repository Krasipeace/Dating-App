import { fetchCurrentUserLikesIds, fetchLikedMembers } from "../actions/likeActions";
import LikesTab from "./likesTab";

export const dynamic = "force-dynamic";

export default async function LikesPage({ searchParams }: { searchParams: { type: string } }) {
    const likeIds = await fetchCurrentUserLikesIds();
    const members = await fetchLikedMembers(searchParams.type);

    return (
        <div>
            <LikesTab members={members} likeIds={likeIds} />
        </div>
    )
}
