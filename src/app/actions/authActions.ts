"use server";

import { auth, signIn, signOut } from "@/auth";
import { EXPIRED_TOKEN, GO_SIGN_IN, INVALID_CREDENTIALS, INVALID_TOKEN, LOGGED_IN_SUCCESSFULLY, MISSING_TOKEN, NO_ROLE_GIVEN, NO_SERVER_RESPONSE, NO_SUCH_EMAIL, SOMETHING_WENT_WRONG, STATUS_ERROR, STATUS_SUCCESS, SUCCESS_MESSAGE, TRY_REGISTER_AGAIN, UNATHORIZED_MESSAGE, USER_ALREADY_EXISTS, USER_NOT_FOUND, VERIFY_EMAIL_BEFORE_SIGNING_IN } from "@/constants/actionConstants";
import { sendForgottenPasswordEmail, sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { ProfileSchema, RegisterSchema, userRegisterSchema } from "@/lib/schemas/registerSchema";
import { generateToken, getToken } from "@/lib/tokens";
import { ActionResult } from "@/types";
import { TokenType, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

/**
 * Register a new user in the system.
 * 
 * @param {RegisterSchema} data - The user registration details, including name, email, password, gender, birth date, country, city, and description.
 * @returns {Promise<ActionResult<User>>} The result of the registration operation, including the created user or an error message.
 * @description Validates user input, hashes the password, checks for existing users, creates a new user with associated member details, and sends a verification email.
 * @example
 *     const result = await registerUser({
 *         name: "John Doe",
 *         email: "example@test.com",
 *         password: "SecurePassword123!",
 *         gender: "male",
 *         birthDate: "1990-01-01",
 *         country: "USA",
 *         city: "New York",
 *         description: "A short bio about the user"
 *     });
 *     if (result.status === STATUS_SUCCESS) {
 *         console.log(result.data);
 *     } else {
 *         console.error(result.error);
 *     }
 * @throws An error if the database query, validation, or email sending fails.
 */
export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = userRegisterSchema.safeParse(data);
        if (!validated.success) return { status: STATUS_ERROR, error: validated.error.errors }

        const { name, email, password, gender, birthDate, country, city, description } = validated.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) return { status: STATUS_ERROR, error: USER_ALREADY_EXISTS };

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: hashedPassword,
                profileComplete: true,
                member: {
                    create: {
                        name,
                        gender,
                        birthDate: new Date(birthDate),
                        country,
                        city,
                        description
                    }
                }
            }
        });

        const verificationToken = await generateToken(email, TokenType.VERIFICATION);

        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { status: STATUS_SUCCESS, data: user }
    } catch (error) {
        console.log(error);
        return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
    }
}

/**
 * Sign in an existing user.
 * 
 * @param {LoginSchema} data - The user login details, including email and password.
 * @returns {Promise<ActionResult<string>>} The result of the sign-in operation, including a success message or an error.
 * @description Validates user input, checks for existing users, verifies the email status, and signs in the user.
 * @example
 *     const result = await signInUser({
 *         email: "example@test.com", 
 *         password: "SecurePassword123!"
 *     });
 *     if (result.status === STATUS_SUCCESS) {
 *         console.log(result.data);
 *     } else {
 *         console.error(result.error);
 * }
 * @throws An error if the database query, validation, or sign-in process fails.
 */
export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const existingUser = await getUserByEmail(data.email);
        if (!existingUser || !existingUser.email) return { status: STATUS_ERROR, error: INVALID_CREDENTIALS }

        if (!existingUser.emailVerified) {
            const token = await generateToken(existingUser.email, TokenType.VERIFICATION);

            await sendVerificationEmail(token.email, token.token);

            return { status: STATUS_ERROR, error: VERIFY_EMAIL_BEFORE_SIGNING_IN }
        }

        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(result);

        return { status: STATUS_SUCCESS, data: LOGGED_IN_SUCCESSFULLY }
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { status: STATUS_ERROR, error: INVALID_CREDENTIALS }
                default:
                    return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
            }
        } else {
            return { status: STATUS_ERROR, error: NO_SERVER_RESPONSE }
        }
    }
}

/**
 * Completes the social profile of a user by updating their profile information in the database.
 * 
 * @param data - The profile data to be updated.
 * @returns A promise that resolves to an ActionResult containing the provider of the user's account.
 * 
 * @throws Will throw an error if the profile update fails.
 */
export async function completeSocialProfile(data: ProfileSchema): Promise<ActionResult<string>> {
    const session = await auth();
    if (!session?.user) return { status: STATUS_ERROR, error: USER_NOT_FOUND }

    try {
        const user = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                profileComplete: true,
                emailVerified: new Date(),
                member: {
                    create: {
                        name: session.user.name as string,
                        image: session.user.image,
                        gender: data.gender,
                        birthDate: new Date(data.birthDate),
                        description: data.description,
                        country: data.country,
                        city: data.city,
                    }
                }
            },
            select: {
                accounts: {
                    select: {
                        provider: true
                    }
                }
            }
        });

        return { status: STATUS_SUCCESS, data: user.accounts[0].provider }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * Signs out the authenticated user.
 * 
 * @returns A promise that resolves when the user is signed out.
 */
export async function signOutUser() {
    await signOut({ redirectTo: "/" });
}

/**
 * Retrieves a user by their email address.
 * 
 * @param email - The email address of the user to retrieve.
 * @returns A promise that resolves to the user object or null if not found.
 */
export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}

/**
 * Retrieves a user by their ID.
 * 
 * @param id - The ID of the user to retrieve.
 * @returns A promise that resolves to the user object or null if not found.
 */
export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: { id }
    });
}

/**
 * Retrieves the authenticated user's ID.
 * 
 * @returns A promise that resolves to the ID of the authenticated user.
 * @throws An error if the user is not authenticated.
 */
export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error(UNATHORIZED_MESSAGE);

    return userId;
}

/**
 * Verifies a user's email address.
 * 
 * @param token - The verification token to verify.
 * @returns A promise that resolves to the result of the verification operation.
 * @throws An error if the token is invalid or expired.
 */
export async function verifyEmail(token: string): Promise<ActionResult<string>> {
    try {
        const existingToken = await getToken(token);
        if (!existingToken) return { status: STATUS_ERROR, error: INVALID_TOKEN }

        const isExpired = new Date() > existingToken.expires;
        if (isExpired) return { status: STATUS_ERROR, error: `${EXPIRED_TOKEN} ${TRY_REGISTER_AGAIN}` }

        const existingUser = await getUserByEmail(existingToken.email);
        if (!existingUser) return { status: STATUS_ERROR, error: USER_NOT_FOUND }


        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                emailVerified: new Date()
            }
        });

        await prisma.token.delete({ where: { id: existingToken.id } });

        return { status: STATUS_SUCCESS, data: SUCCESS_MESSAGE }
    } catch (error) {
        console.log(error);

        return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
    }
}

/**
 * Sends a password reset email to the user.
 * 
 * @param email - The email address of the user requesting the password reset.
 * @returns A promise that resolves to the result of the password reset operation.
 * @throws An error if the email address is not found or the operation fails.
 */
export async function resetPasswordEmail(email: string): Promise<ActionResult<string>> {
    try {
        const userByEmail = await getUserByEmail(email);
        if (!userByEmail) return { status: STATUS_ERROR, error: NO_SUCH_EMAIL }

        const token = await generateToken(email, TokenType.PASSWORD_RESET);

        await sendForgottenPasswordEmail(token.email, token.token);

        return { status: STATUS_SUCCESS, data: `Password reset request sent to ${email}. If it is not in the main folder, check your SPAM folder.` }
    } catch (error) {
        console.log(error);

        return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
    }
}

/**
 * Resets the user's password.
 * 
 * @param password - The new password to set.
 * @param token - The password reset token.
 * @returns A promise that resolves to the result of the password reset operation.
 * @throws An error if the token is invalid, expired, or the operation fails.
 */
export async function resetPassword(password: string, token: string | null): Promise<ActionResult<string>> {
    try {
        if (!token) return { status: STATUS_ERROR, error: MISSING_TOKEN }

        const existingToken = await getToken(token);
        if (!existingToken) return { status: STATUS_ERROR, error: INVALID_TOKEN }

        const isExpired = new Date() > existingToken.expires;
        if (isExpired) return { status: STATUS_ERROR, error: EXPIRED_TOKEN }

        const existingUser = await getUserByEmail(existingToken.email);
        if (!existingUser) return { status: STATUS_ERROR, error: USER_NOT_FOUND }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                id: existingUser.id
            },
            data: {
                passwordHash: hashedPassword
            }
        });

        await prisma.token.delete({
            where: {
                id: existingToken.id
            }
        });

        return { status: STATUS_SUCCESS, data: GO_SIGN_IN }
    } catch (error) {
        console.log(error);

        return { status: STATUS_ERROR, error: SOMETHING_WENT_WRONG }
    }
}

/**
 * Retrieves the role of the authenticated user.
 * 
 * @returns A promise that resolves to the role of the authenticated user.
 * @throws An error if the user is not authenticated or no role is found.
 */
export async function getUserRole() {
    const session = await auth();

    const role = session?.user.role;
    if (!role) throw new Error(NO_ROLE_GIVEN);

    return role;
}

// let counter = 0;
// export default async function simpleCiud(): Promise<string> {
//     const generateId = () => {
//         const timestamp = Date.now().toString(36);
//         const randomPart = Math.random().toString(36).substring(2, 10);
//         const counterPart = (counter++).toString(36);

//         if (counter > 1_000_000) counter = 0;

//         return `c${timestamp}${randomPart}${counterPart}`;
//     };

//     let newId = generateId();
//     let idExists = await prisma.member.findUnique({
//         where: { userId: newId },
//     });

//     while (idExists) {
//         newId = generateId();
//         idExists = await prisma.member.findUnique({
//             where: { userId: newId },
//         });
//     }

//     return newId;
// }