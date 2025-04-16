"use client";

import { ConsentStatus, CookieConsentContextType } from "@/types";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [consent, setConsentState] = useState<ConsentStatus>(null);

    const setConsent = (consent: "accepted" | "declined") => {
        setConsentState(consent);

        if (consent === "accepted") {
            document.cookie = `cookie_consent=accepted; path=/; max-age=31536000`; 
        } else {
            document.cookie = `cookie_consent=; path=/; max-age=0`;
        }
    };

    useEffect(() => {
        const cookies = document.cookie.split("; ").reduce((acc: Record<string, string>, current) => {
            const [name, value] = current.split("=");
            acc[name] = value;
            return acc;
        }, {});

        if (cookies["cookie_consent"] === "accepted") {
            setConsentState("accepted");
        }
    }, []);

    const openBanner = () => {
        console.log("Opening cookie consent banner...");
    };

    return (
        <CookieConsentContext.Provider value={{ consent, setConsent, openBanner }}>
            {children}
        </CookieConsentContext.Provider>
    );
};

export const useCookieConsent = (): CookieConsentContextType => {
    const context = useContext(CookieConsentContext);
    if (!context) {
        throw new Error("useCookieConsent must be used within a CookieConsentProvider");
    }
    return context;
};
