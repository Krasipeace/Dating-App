import { getReportedMessages } from "@/app/actions/adminActions"

export default async function AdminMessagesPage() {
    const messages = await getReportedMessages();

    return (
        <div className="shadow-md flex flex-col items-center pb-2">
            <h3 className="italic">Reported Messages</h3>
        </div>
    )
}