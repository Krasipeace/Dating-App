import { Link } from "@nextui-org/react";
import { RxGithubLogo } from "react-icons/rx";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-black py-3 text-center mt-20">
            <div className="flex justify-center items-center">
                <p>&copy; {currentYear} - Krasimir Dramaliev</p>
                <Link href="https://github.com/krasipeace" target="_blank"><RxGithubLogo className="ml-2 text-black" /></Link>
            </div>
        </footer>
    );
}