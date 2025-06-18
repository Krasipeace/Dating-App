import { Link, Tooltip } from "@heroui/react";
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
        <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-sm text-black py-3 text-center mt-20 footer">
            <div className="flex justify-center items-center">
                <p>&copy; {currentYear} <span className="text-orange-400">Heart</span><span className="text-red-900">Bound</span></p>
                <Tooltip content="go to GitHub" placement="top" aria-label="GitHub" aria-live="polite">
                    <Link href="https://github.com/Krasipeace/Dating-App" target="_blank" aria-label="go to GitHub source code">
                        <RxGithubLogo className="ml-2 text-fuchsia-900" aria-label="github icon" />
                    </Link>
                </Tooltip>&nbsp;|&nbsp;
                <Tooltip content="go to Privacy policy page" aria-label="Privacy policy" aria-live="polite">
                    <Link href="/privacy" target="_blank" aria-label="Privacy Policy" className="text-sm text-indigo-200">
                        Privacy
                    </Link>
                </Tooltip>&nbsp;
            </div>
        </footer>
    );
}