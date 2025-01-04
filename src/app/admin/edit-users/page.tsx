import { getAllMembers } from "@/app/actions/adminActions";
import EditUsersInfo from "./editUserInfo";
import { Card } from "@nextui-org/react";

export default async function EditUsersPage() {
    const members = await getAllMembers();

    return (
        <>
            <div className="shadow-md flex flex-col items-center pb-2">
                <h3 className="italic">Edit users</h3>
            </div>
            <Card>
                <EditUsersInfo members={members} />
            </Card>
        </>
    );
}