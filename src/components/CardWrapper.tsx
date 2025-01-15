import { CardWrapperProps } from "@/types/wrapperProps";
import { CardHeader, Divider, CardBody, CardFooter } from "@nextui-org/react";

/**
 * CardWrapper component
 * @param {CardWrapperProps} { header, body, footer }
 * @returns {JSX.Element} CardWrapper component
 * @description CardWrapper component to wrap any component with a card
 * @example
 *   <CardWrapper
 *       header="Header Text"
 *       body={body}
 *       footer={footer}
 *   />
 * @see CardWrapperProps
 */
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