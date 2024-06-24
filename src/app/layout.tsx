import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import TopNav from "@/components/navbar/TopNav";
import Footer from "@/components/Footer";
import { auth } from "@/auth";

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

	return (
		<html lang="en">
			<body>
				<Providers userId={userId}>
					<TopNav />
					<main className="container mx-auto p-10">
						{children}
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
