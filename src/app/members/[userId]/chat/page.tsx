import CardWrapper from "@/components/CardWrapper"
import ChatForm from "./ChatForm"
import { getMessageThread } from "@/app/actions/messageActions"

export default async function ChatPage({ params }: { params: { userId: string } }) {
    const messages = await getMessageThread(params.userId);

    const body = (
        <div>
            {messages.length === 0 ? "No messages yet" : (
                <div>
                    {messages.map(m => (<p key={m.id}>{m.text}</p>))}
                </div>
            )}
        </div>
    )

    return (
        <CardWrapper header={"Chat"} body={body} footer={<ChatForm />} />
    )
}