import { getAllMembers } from "@/app/actions/adminActions";
import { Card } from "@heroui/react";
import EditUsersInfo from "./EditUsers";

export default async function EditUsersPage() {
    const members = await getAllMembers();

    return (
        <>
            <div className="shadow-md flex flex-col items-center pb-2">
                <h3 className="italic">App Users</h3>
            </div>
            <Card className="pb-7">
                <EditUsersInfo members={members} />
            </Card>
        </>
    );
}