import { auth } from "@/auth";
import ClientSession from "@/components/ClientSession";
import GifHandler from "@/components/GifHandler";
import { getTopLikedUsers } from "./actions/userActions";
import TopLikedUsersTable from "@/components/TopLikedUsers";

export default async function Home() {
	const session = await auth();
	const role = session?.user.role;
	const topLikedUsers = await getTopLikedUsers();

	return (
		<>
			{session ? (
				<>
					{role === "ADMIN" ? (
						<div className="flex flex-row justify-around mt-20 gap-6">

							<div className="bg-blue-50 p-10 rounded-3xl shadow-md w-1/2 overflow-auto">
								<h2 className="text-2xl font-semibold">Server session data:</h2>
								<div>
									<pre>{JSON.stringify(session, null, 2)}</pre>
								</div>
							</div>
							<ClientSession />
						</div>

					) : (
						<div className="flex flex-col justify-center items-center pt-2">
							<h2 className="text-xl">Most Liked Users</h2>
							<TopLikedUsersTable users={topLikedUsers} />
						</div>
					)}
				</>
			) : (
				<div>
					<GifHandler gifUrl="https://i.imgur.com/Jw7WhXd.gif" altText="front-page-image" width="1152" height="648" />
				</div>
			)}
		</>
	);
}
