import { getAuditLogs } from "@/app/actions/adminActions";
import Logs from "./Logs";

export default async function LogsPage() {
    const logs = await getAuditLogs();

    return <Logs logs={logs} />;
}