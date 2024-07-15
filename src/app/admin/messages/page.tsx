import { getReportedMessages } from "@/app/actions/adminActions"
import ThumbsDownButton from "@/components/buttons/ThumbsDownButton";
import ThumpsUpButton from "@/components/buttons/ThumpsUpButton";
import { Card, CardBody } from "@nextui-org/react";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
    const messages = await getReportedMessages();

    return (
        <div className="shadow-md">
            <h3 className="italic flex flex-col items-center pb-5">Reported Messages</h3>
            {messages.length > 0 ? (
                <Card>
                    <CardBody>
                        {messages.map((message) => (
                            <div key={message.id} className="flex justify-between items-center py-2">
                                <p>{message.text}</p>
                                <div>
                                    <ThumpsUpButton messageId={message.id} />
                                    <ThumbsDownButton messageId={message.id} />
                                </div>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardBody>
                        <p className="flex flex-col items-center">No reported messages found</p>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}