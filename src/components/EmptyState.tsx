import { Card, CardBody, CardHeader } from "@heroui/react";

/**
 * EmptyState component
 * @returns {JSX.Element} EmptyState component
 * @description EmptyState component to display an empty state message
 * @example
 *   <EmptyState />
 */
export default function EmptyState() {
    return (
        <div className="flex justify-center items-center mt-20">
            <Card className="p-5">
                <CardHeader className="text-2xl text-primary">
                    No results for this filter
                </CardHeader>
                <CardBody className="text-center text-secondary">
                    Select a different filter
                </CardBody>
            </Card>
        </div>
    )
}