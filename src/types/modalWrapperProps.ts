import { ButtonProps } from "@nextui-org/react";
import { ReactNode } from "react";

export type ModalWrapperProps = {
    isOpen: boolean;
    onClose: () => void;
    header?: string;
    body: ReactNode;
    footer?: ButtonProps[];
    image?: boolean;
}