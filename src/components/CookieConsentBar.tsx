"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CookieConsentBar: React.FC = () => {
    const { consent, setConsent } = useCookieConsent();
    const [visible, setVisible] = useState(consent === null);
    const router = useRouter();

    const handleAccept = () => {
        setConsent("accepted");
        toast.success("Thank you for accepting cookies.");
        setVisible(false);
    };

    const handleDecline = () => {
        setConsent("declined");
        toast.warn("You chose to decline cookies. You will be redirected to google...");
        setVisible(false);
        setTimeout(() => {
            window.location.href = "https://www.google.com";
        }, 5000);
    };

    useEffect(() => {
        if (consent !== null) {
            setVisible(false);
        }
    }, [consent]);

    if (!visible) return null;

    return (
        <div className="cookie-consent-bar fixed bottom-0 w-full bg-gray-900 text-white px-4 py-3 flex flex-col md:flex-row justify-between items-center z-50 shadow-lg">
            <p className="text-sm mb-2 md:mb-0">
                We use cookies to enhance your experience. By using this site, you agree or decline cookies. Check our privacy policy by clicking&nbsp;
                <Link className="text-sm" href="/privacy" target="_blank">
                    here
                </Link>
            </p>
            <div className="flex gap-2">
                <Button onClick={handleAccept}>Accept</Button>
                <Button onClick={handleDecline}>Decline</Button>
            </div>
        </div>
    );
};

export default CookieConsentBar;
