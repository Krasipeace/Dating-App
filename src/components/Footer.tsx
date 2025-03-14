import { Link, Tooltip } from "@nextui-org/react";
import { RxGithubLogo } from "react-icons/rx";

/**
 * Footer component
 * @returns {JSX.Element} Footer component
 * @description Footer component to display the footer
 * @example
 *   <Footer />
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-black py-3 text-center mt-20 footer">
            <div className="flex justify-center items-center">
                <p>&copy; {currentYear} - Krasimir Dramaliev</p>
                <Tooltip content="go to GitHub" placement="top" aria-label="GitHub" aria-live="polite">
                    <Link href="https://github.com/krasipeace" target="_blank" aria-label="go to GitHub">
                        <RxGithubLogo className="ml-2 text-black" aria-label="github icon" />
                    </Link>
                </Tooltip>
            </div>
        </footer>
    );
}