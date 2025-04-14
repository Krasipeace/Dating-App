import { ReactNode } from "react";
import { IconType } from "react-icons";
import { ButtonProps } from "@nextui-org/react";

export type CardWrapperProps = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}

export type ModalWrapperProps = {
    isOpen: boolean;
    onClose: () => void;
    header?: string;
    body: ReactNode;
    footer?: ButtonProps[];
    image?: boolean;
}

export type AuthWrapperProps = {
    body?: ReactNode;
    headerIcon: IconType;
    headerText: string;
    subHeaderText?: string;
    action?: () => void;
    actionLabel?: string;
    footer?: ReactNode;
}