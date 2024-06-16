import CardWrapper from "@/components/CardWrapper"
import ChatForm from "./ChatForm"

export default async function ChatPage() {
    return (
        <CardWrapper header={"Chat"} body={<p>Chat here</p>} footer={<ChatForm />} />
    )
}