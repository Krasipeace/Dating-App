import { auth } from "@/auth";
import ClientSession from "@/components/ClientSession";
import GifHandler from "@/components/GifHandler";
import { getTopLikedUsers } from "./actions/userActions";

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
							<div className="justify-center items-center pt-5">
								<table className="table-auto divide-y divide-gray-200 items-center justify-center">
									<thead className="bg-gray-50">
										<tr>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Place
											</th>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Name
											</th>
											<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Likes
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200 items-center">
										{topLikedUsers.map((user, index) => (
											<tr key={user.id}>
												<td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">
													{index + 1}
												</td>
												<td className="px-6 py-4 whitespace-wrap text-sm text-gray-900">
													{user.name}
												</td>
												<td className="px-6 py-4 whitespace-wrap text-sm text-gray-900">
													{user._count?.targetLikes}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
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
