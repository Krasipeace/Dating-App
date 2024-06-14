import { CardHeader, Divider, CardBody } from "@nextui-org/react"

export default function ChatPage() {
    return (
        <>
            <CardHeader className="text-2xl font-semibold text-secondary">Chat</CardHeader>
            <Divider />
            <CardBody>No chats so far... Start one!</CardBody>
        </>
    )
}