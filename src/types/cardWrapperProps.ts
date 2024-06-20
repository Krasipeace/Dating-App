import { ReactNode } from "react";

export type CardWrapperProps = {
    header: ReactNode | string;
    body: ReactNode;
    footer?: ReactNode;
}