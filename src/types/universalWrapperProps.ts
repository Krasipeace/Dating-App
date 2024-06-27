import { ReactNode } from "react";
import { IconType } from "react-icons";

export type UniversalWrapperProps = {
    body?: ReactNode;
    headerIcon: IconType;
    headerText: string;
    subHeaderText?: string;
    action?: () => void;
    actionLabel?: string;
}