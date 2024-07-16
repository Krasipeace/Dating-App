import CardWrapper from "@/components/CardWrapper";
import ChatForm from "./ChatForm";
import { getMessageThread } from "@/app/actions/messageActions";
import { getAuthUserId } from "@/app/actions/authActions";
import MessageList from "./MessageList";
import { getChatId } from "@/lib/utilities";

export default async function ChatPage({ params }: { params: { userId: string } }) {
    const messages = await getMessageThread(params.userId);
    const userId = await getAuthUserId();
    const chatId = getChatId(userId, params.userId);

    return (
        <CardWrapper
            header={"Chat"}
            body={
                <MessageList initialMessages={messages} currentUserId={userId} chatId={chatId} />
            }
            footer={<ChatForm />}
        />
    )
}