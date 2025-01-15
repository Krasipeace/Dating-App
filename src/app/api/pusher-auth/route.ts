import { auth } from "@/auth";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

/**
 * Handle a POST request to authenticate a Pusher channel.
 * 
 * @param {Request} request - The incoming HTTP request object containing the socket ID and channel name.
 * @returns {Promise<Response>} A response object with the Pusher authentication payload or an error message.
 * @description Authenticates a user for a Pusher channel by validating the user's session and generating an authorization payload.
 * @example
 *   const request = new Request("https://example.com", {
 *       method: "POST",
 *       body: new URLSearchParams({
 *           socket_id: "12345.67890",
 *           channel_name: "private-channel"
 *       })
 *   });
 *   const response = await POST(request);
 *   console.log(await response.json());
 * @throws Returns a 401 response if the user is not authenticated or an error response if the request fails.
 */
export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new Response("Unauthorised", { status: 401 })
        }

        const body = await request.formData();
        const socketId = body.get("socket_id") as string;
        const channel = body.get("channel_name") as string;
        const data = {
            user_id: session.user.id
        }

        const authResponse = pusherServer.authorizeChannel(socketId, channel, data)

        return NextResponse.json(authResponse);
    } catch (error) {
        console.error("Error during Pusher authentication:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}