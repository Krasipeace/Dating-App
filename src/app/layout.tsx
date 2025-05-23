import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import Footer from "@/components/Footer";
import { auth } from "@/auth";
import CookieConsentBar from "@/components/CookieConsentBar";

export const metadata: Metadata = {
	title: "HeartBound",
	description: "Dating app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	const userId = session?.user?.id || null;
	const profileComplete = session?.user.profileComplete as boolean;

	return (
		<html lang="en">
			<body className="relative min-h-screen">
				<Providers userId={userId} profileComplete={profileComplete}>
					<TopNav />
					<main className="container mx-auto p-10">
						{children}
					</main>
					<CookieConsentBar />
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
