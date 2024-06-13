"use client"

import { ReactNode } from "react"
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <ToastContainer position="bottom-right" className="z-50" pauseOnHover />
            {children}
        </NextUIProvider>
    )
}