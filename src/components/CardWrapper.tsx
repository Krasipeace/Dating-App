import { CardWrapperProps } from "@/types/cardWrapperProps";
import { CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react";

export default function CardWrapper({ header, body, footer }: CardWrapperProps) {
    return (
        <>
            <CardHeader>
                {typeof (header) === "string" ? (
                    <div className="text-2xl font-semibold text-secondary">
                        {header}
                    </div>
                ) : (
                    <>{header}</>
                )}
            </CardHeader>
            <Divider />
            <CardBody>{body}</CardBody>
            {footer && (
                <CardFooter>
                    {footer}
                </CardFooter>
            )}
        </>
    )
}