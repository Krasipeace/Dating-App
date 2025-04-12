import "@/app/globals.css";
import { Card, CardBody } from "@nextui-org/react";
import { LogsProps } from "@/types/uiProps";

export default function Logs({ logs }: LogsProps) {
    return (
        <div className="shadow-md">
            <h3 className="italic flex flex-col items-center pb-5">Administrator logs</h3>
            {logs.length > 0 ? (
                <Card className="pb-7">
                    <CardBody>
                        <table className="table">
                            <thead className="table-head">
                                <tr>
                                    <th>Action</th>
                                    <th>Admin ID</th>
                                    <th>Entity Type</th>
                                    <th>Details</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <td>{log.action}</td>
                                        <td>{log.adminId}</td>
                                        <td>{log.entityType}</td>
                                        <td>{log.details}</td>
                                        <td>{log.timestamp.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
    );
}