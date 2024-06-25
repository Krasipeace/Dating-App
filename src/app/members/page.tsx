import PaginationComponent from "@/components/PaginationComponent";
import { fetchCurrentUserLikesIds } from "../actions/likeActions";
import { getMembers } from "../actions/memberActions"
import MemberCard from "./memberCard";
import { UserFilters } from "@/types";

export default async function MembersPage({ searchParams }: { searchParams: UserFilters }) {
    const members = await getMembers(searchParams);
    const likeIds = await fetchCurrentUserLikesIds();

    

    return (
        <>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8">
                {members && members?.map(member => (
                    <MemberCard member={member} key={member.id} likeIds={likeIds} />
                ))}
            </div>
            <PaginationComponent />
        </>
    )
}