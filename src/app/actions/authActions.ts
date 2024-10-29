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

export async function signOutUser() {
    await signOut({ redirectTo: "/" });
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}

export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: { id }
    });
}

export async function getAuthUserId() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) throw new Error(UNATHORIZED_MESSAGE);

    return userId;
}

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

export async function getUserRole() {
    const session = await auth();

    const role = session?.user.role;
    if (!role) throw new Error(NO_ROLE_GIVEN);

    return role;
}