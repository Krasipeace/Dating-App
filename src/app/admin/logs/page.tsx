import { getAuditLogs } from "@/app/actions/adminActions"
import { Card, CardBody } from "@nextui-org/react";

export const dynamic = "force-dynamic";

export default async function LogsPage() {
    const logs = await getAuditLogs();

    return (
        <div className="shadow-md">
            <h3 className="italic flex flex-col items-center pb-5">Administrator logs</h3>
            {logs.length > 0 ? (
                <Card>
                    <CardBody>
                        {logs.map((log) => (
                            <div key={log.id} className="flex justify-between items-center p-2 shadow-md rounded-md">
                                <span className="font-serif">{log.action} {log.details} {log.entityType} by {log.adminId}</span>
                                <div className="flex gap-2">
                                    <span>{log.timestamp.toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardBody>
                        <p className="flex flex-col items-center">No logs found</p>
                    </CardBody>
                </Card>
            )}
        </div>
    )
}