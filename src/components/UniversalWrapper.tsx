import { UniversalWrapperProps } from "@/types/wrapperProps";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";

/**
 * UniversalWrapper component
 * @param {UniversalWrapperProps} { footer, body, headerIcon: Icon, headerText, subHeaderText, action, actionLabel }
 * @returns {JSX.Element} UniversalWrapper component
 * @description UniversalWrapper component to wrap any component with a card
 * @example
 *   <UniversalWrapper
 *       headerIcon={Icon}
 *       headerText="Header Text"
 *       subHeaderText="Sub Header Text"	
 *       action={action}
 *       actionLabel="Action Label"
 *       footer={footer}
 *       body={body}
 *   />
 * @see UniversalWrapperProps
 */
export default function UniversalWrapper({ footer, body, headerIcon: Icon, headerText, subHeaderText, action, actionLabel }: UniversalWrapperProps) {
    return (
        <div className="flex items-start justify-center vertical-center">
            <Card className="w-2/5 mx-auto p-5">
                <CardHeader className="flex flex-col items-center justify-center">
                    <div className="flex flex-col gap-2 items-center text-secondary">
                        <div className="flex flex-row items-center gap-2">
                            <Icon size={30} />
                            <h2 className="text-2xl font-bold">{headerText}</h2>
                        </div>
                        {subHeaderText && <p className="text-neutral-500">{subHeaderText}</p>}
                    </div>
                </CardHeader>
                {body &&
                    <CardBody>
                        {body}
                    </CardBody>}
                <CardFooter>
                    {action && (
                        <Button onClick={action} fullWidth color="secondary" variant="bordered">
                            {actionLabel}
                        </Button>
                    )}
                    {footer && (
                        <>{footer}</>
                    )}
                </CardFooter>
            </Card>
        </div>
    )
}