import { deleteMessage, getMessagesByContainer, reportMessage } from "@/app/actions/messageActions";
import { MessageDto } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import useMessageStore from "./useMessageStore";

export const useMessages = (initialMessages: MessageDto[], nextCursor?: string) => {
    const cursorRef = useRef(nextCursor);
    const { set, remove, messages, updateUnreadCount, resetMessages } = useMessageStore(state => ({
        set: state.set,
        remove: state.remove,
        messages: state.messages,
        updateUnreadCount: state.updateUnreadCount,
        resetMessages: state.resetMessages
    }));
    const searchParams = useSearchParams();
    const router = useRouter();
    const isOutbox = searchParams.get("container") === "outbox";
    const [isDeleting, setDeleting] = useState({
        id: "", loading: false
    });
    const [isReporting, setReporting] = useState({
        id: "", loading: false
    })
    const container = searchParams.get("container");
    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);

    useEffect(() => {
        set(initialMessages);
        cursorRef.current = nextCursor;

        return () => {
            resetMessages();
        }
    }, [initialMessages, set, nextCursor, resetMessages]);

    const loadMoreMessages = useCallback(async () => {
        if (cursorRef.current) {
            setLoadingMoreMessages(true);
            const { messages, nextCursor } = await getMessagesByContainer(container, cursorRef.current);
            set(messages);
            cursorRef.current = nextCursor;
            setLoadingMoreMessages(false);
        }
    }, [container, set]);

    const columns = [
        { key: isOutbox ? "recipientName" : "senderName", label: isOutbox ? "Recipient" : "Sender" },
        { key: "text", label: "Message" },
        { key: "created", label: isOutbox ? "Date sent" : "Date received" },
        { key: "actions", label: "Actions" },
    ]

    const handleDeleteMessage = useCallback(async (message: MessageDto) => {
        setDeleting({ id: message.id, loading: true });
        await deleteMessage(message.id, isOutbox);
        remove(message.id);
        if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
        setDeleting({ id: '', loading: false });
    }, [isOutbox, remove, updateUnreadCount])

    const handleReportMessage = useCallback(async (message: MessageDto) => {
        setReporting({ id: message.id, loading: true });
        await reportMessage(message.id);
        setReporting({ id: message.id, loading: false });
    }, []);

    const handleRowSelect = (key: Key) => {
        const message = messages.find(m => m.id === key);
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`;
        router.push(url + "/chat");
    }

    return {
        isOutbox,
        columns,
        isDeleting,
        deleteMessage: handleDeleteMessage,
        isReporting,
        reportMessage: handleReportMessage,
        selectRow: handleRowSelect,
        messages,
        loadingMoreMessages,
        loadMoreMessages,
        hasMoreMessages: !!cursorRef.current
    }
}