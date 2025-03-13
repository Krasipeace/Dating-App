import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { GiHalfHeart } from "react-icons/gi";
import Link from "next/link";
import { auth } from "@/auth";
import { getUserInfo } from "@/app/actions/userActions";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import FiltersWrapper from "./FiltersWrapper";
import AdminMenu from "./AdminMenu";

/**
 * TopNav component
 * @returns {JSX.Element} TopNav component
 * @description TopNav component to display the top navigation
 * @example
 *   <TopNav />
 */
export default async function TopNav() {
    const session = await auth();
    const userInfo = session?.user && await getUserInfo();
    const role = session?.user.role;
    const userLinks = [
        { href: "/members", label: "People" },
        { href: "/likes", label: "Likes" },
        { href: "/messages", label: "Messages" }
    ];
    const adminLinks = [
        { href: "/admin/messages", label: "Messages" },
        { href: "/admin/photos", label: "Photos" },
        { href: "/admin/edit-users", label: "Users" },
        { href: "/admin/logs", label: "Logs" }
    ];
    const links = role === "ADMIN" ? adminLinks : userLinks;

    return (
        <>
            <Navbar
                maxWidth="xl"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                classNames={{
                    item: [
                        "text-xl",
                        "text-white",
                        "uppercase",
                        "data-[active=true]:text-yellow-200"
                    ]
                }}
                aria-label="Main menu"
            >
                <NavbarBrand as={Link} href="/">
                    <GiHalfHeart size={50} className="text-orange-400" aria-hidden="true" />
                    <div className="font-bold text-3xl flex" aria-label="Click to go back to home page">
                        <span className="text-red-900">Heart</span>
                        <span className="text-orange-400">Bound</span>
                    </div>
                </NavbarBrand>
                <NavbarContent justify="center">
                    {session && links.map(item => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                        />
                    ))}
                </NavbarContent>
                <NavbarContent justify="end">
                    {userInfo ? (
                        role !== "ADMIN" ? (
                            <UserMenu userInfo={userInfo} />
                        ) : (
                            <AdminMenu userInfo={userInfo} />
                        )
                    ) : (
                        <>
                            <Button
                                as={Link}
                                href="/login"
                                variant="bordered"
                                className="text-green-100"
                                aria-label="Click to go to login page"
                            >
                                Login
                            </Button>
                            <Button
                                as={Link}
                                href="/register"
                                variant="bordered"
                                className="text-green-100"
                                aria-label="Click to go to register page"
                            >
                                Register
                            </Button>
                        </>
                    )}
                </NavbarContent>
            </Navbar>
            <FiltersWrapper />
        </>
    )
}