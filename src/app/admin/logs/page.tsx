import { getAuditLogs } from "@/app/actions/adminActions";
import Logs from "./Logs";

export const dynamic = "force-dynamic";

export default async function LogsPage() {
    const logs = await getAuditLogs();

    return <Logs logs={logs} />;
}