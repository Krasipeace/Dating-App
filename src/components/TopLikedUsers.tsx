import { TopLikedUsersTableProps } from "@/types/likeProps";

export default function TopLikedUsersTable({ users }: TopLikedUsersTableProps) {
    return (
        <div className="justify-center items-center pt-5">
            <table className="table-auto divide-y divide-gray-200 items-center justify-center">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Place
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Likes
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 items-center">
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-gray-900">
                                {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900">
                                {user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-wrap text-sm text-gray-900">
                                {user._count?.targetLikes ?? 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
