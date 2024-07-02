import { auth } from "@/auth";
import ClientSession from "@/components/ClientSession";
import GifHandler from "@/components/GifHandler";

export default async function Home() {
	const session = await auth();

	return (
		<div className="flex flex-row justify-around mt-20 gap-6">
			<div className="bg-blue-50 p-10 rounded-3xl shadow-md w-1/2 overflow-auto">
				<h2 className="text-2xl font-semibold">Server session data:</h2>
				{session ? (
					<div>
						<pre>{JSON.stringify(session, null, 2)}</pre>
					</div>
				) : (
					<div>
						<GifHandler gifUrl="https://i.imgur.com/Jw7WhXd.gif" altText="front-page-image" width="1152" height="648" />
					</div>
				)}
			</div>
			<ClientSession />
		</div>
	);
}
