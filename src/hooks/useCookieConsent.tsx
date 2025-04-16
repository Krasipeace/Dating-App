import { CookieConsentContextType } from "@/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [consent, setConsentState] = useState<"accepted" | "declined" | null>(null);

    const setConsent = (consent: "accepted" | "declined") => {
        setConsentState(consent);
        document.cookie = `cookie_consent=${consent}; path=/; max-age=31536000`;
    };

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
