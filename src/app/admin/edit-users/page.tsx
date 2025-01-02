import { getAllMembers } from "@/app/actions/adminActions";

export default async function EditUsersPage() {
    const members = await getAllMembers();

    return (
        <div>Users for administration will be here</div>
    )
}