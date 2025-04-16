"use client";

import { useCookieConsent } from "@/hooks/useCookieConsent";

const CookieConsentBar: React.FC = () => {
    const { consent, setConsent, openBanner } = useCookieConsent();

    const handleAccept = () => {
        setConsent("accepted");
    };

    const handleDecline = () => {
        setConsent("declined");
    };

    return (
        <div className="cookie-consent-bar">
            {consent === null ? (
                <>
                    <p>We use cookies to enhance your experience. By using this site, you accept our use of cookies.</p>
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleDecline}>Decline</button>
                </>
            ) : (
                <p>{consent === "accepted" ? "Thank you for accepting cookies." : "You have declined cookies."}</p>
            )}
        </div>
    );
};

export default CookieConsentBar;
