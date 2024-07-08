import { ModalWrapperProps } from "@/types/modalWrapperProps";
import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function ModalWrapper({ isOpen, onClose, header, body, footer }: ModalWrapperProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="top-center"
            motionProps={{
                variants: {
                    enter: {
                        y: 0, x: 30, opacity: 100, transition: { duration: 0.5 }
                    },
                    exit: {
                        y: 100, x: -30, opacity: 0, transition: { duration: 0.5 }
                    }
                }
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    {footer.map((props: ButtonProps, index) => (
                        <Button {...props} key={index}>{props.children}</Button>
                    ))}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}