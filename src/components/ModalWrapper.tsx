import { ModalWrapperProps } from "@/types/modalWrapperProps";
import { Button, ButtonProps, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function ModalWrapper({ isOpen, onClose, header, body, footer, image }: ModalWrapperProps) {
    const handleCloseModal = () => {
        setTimeout(() => onClose(), 10);
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            placement="top-center"
            classNames={{
                base: `${image ? "border-2 border-white" : ""}`,
                body: `${image ? "p-0" : ""}`
            }}
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
                {!image &&
                    <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
                }
                <ModalBody>{body}</ModalBody>
                {!image &&
                    <ModalFooter>
                        {footer && footer.map((props: ButtonProps, index) => (
                            <Button {...props} key={index}>{props.children}</Button>
                        ))}
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    )
}