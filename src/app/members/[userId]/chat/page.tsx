import CardWrapper from "@/components/CardWrapper"
import ChatForm from "./ChatForm"
import { getMessageThread } from "@/app/actions/messageActions"
import { getAuthUserId } from "@/app/actions/authActions";
import MessageBox from "./MessageBox";

export default async function ChatPage({ params }: { params: { userId: string } }) {
    const messages = await getMessageThread(params.userId);
    const userId = await getAuthUserId();

    const body = (
        <div>
            {messages.length === 0 ? "No messages yet" : (
                <div>
                    {messages.map(m => (
                        <MessageBox key={m.id} message={m} currentUserId={userId} />
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <CardWrapper header={"Chat"} body={body} footer={<ChatForm />} />
    )
}