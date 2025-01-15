import { prisma } from "./prisma";
import { TokenType } from "@prisma/client";

/**
 * Retrieves a token by email.
 * 
 * @param email - The email address associated with the token.
 * @returns A promise that resolves to the token object if found, otherwise null.
 * @throws An error if the database query fails.
 */
export async function getTokenByEmail(email: string) {
    try {
        return prisma.token.findFirst({
            where: { email }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Generates a new token for the given email and token type.
 * 
 * @param email - The email address for which the token is generated.
 * @param type - The type of the token.
 * @returns A promise that resolves to the newly created token object.
 * @throws An error if the database query fails.
 */
export async function generateToken(email: string, type: TokenType) {
    const arrayBuffer = new Uint8Array(48);
    crypto.getRandomValues(arrayBuffer);
    const token = Array.from(arrayBuffer, byte => byte.toString(16).padStart(2, "0")).join("");
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const existingToken = await getTokenByEmail(email);
    if (existingToken) {
        await prisma.token.delete({
            where: { id: existingToken.id }
        });
    }

    return prisma.token.create({
        data: {
            email, token, expires, type
        }
    })
}

/**
 * Retrieves a token by its token string.
 * 
 * @param token - The token string.
 * @returns A promise that resolves to the token object if found, otherwise null.
 * @throws An error if the database query fails.
 */
export async function getToken(token: string) {
    try {
        return prisma.token.findFirst({
            where: { token }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}