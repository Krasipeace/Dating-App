import { auth } from "@/auth";
import GifHandler from "@/components/GifHandler";

export default async function Home() {
	const session = await auth();
	return (
		<div>
			{session ? (
				<div>
					<h1 className="text-3xl">Hello app!</h1>
					<h2 className="text-2xl font-semibold">User session data:</h2>
					<div>
						<pre>{JSON.stringify(session, null, 2)}</pre>
					</div>
				</div>
			) : (
				<div>
					<GifHandler gifUrl="https://i.imgur.com/v2pbvcz.gif" altText="front-page-image" width="1152" height="648" />
				</div>
			)}
		</div>
	);
}
