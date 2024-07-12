"use server";

import { prisma } from "@/lib/prisma";
import { getAuthUserId } from "./authActions";
import { pusherServer } from "@/lib/pusher";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const userId = await getAuthUserId();

        if (isLiked) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else {
            const likeUser = await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId
                },
                select: {
                    sourceMember: {
                        select: {
                            name: true,
                            image: true,
                            userId: true
                        }
                    }
                }
            });

            await pusherServer.trigger(`private-${targetUserId}`, "like:new", {
                name: likeUser.sourceMember.name,
                image: likeUser.sourceMember.image,
                userId: likeUser.sourceMember.userId
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchCurrentUserLikesIds() {
    try {
        const userId = await getAuthUserId();

        const likeIds = await prisma.like.findMany({
            where: {
                sourceUserId: userId
            },
            select: {
                targetUserId: true
            }
        })

        return likeIds.map(l => l.targetUserId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchLikedMembers(type = "source") {
    try {
        const userId = await getAuthUserId();

        switch (type) {
            case "source":
                return await fetchSourceLikes(userId);
            case "target":
                return await fetchTargetLikes(userId);
            case "mutual":
                return await fetchMutualLikes(userId);
            default:
                return [];
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fetchSourceLikes(userId: string) {
    const sourceList = await prisma.like.findMany({
        where: {
            sourceUserId: userId
        },
        select:
            { targetMember: true }
    });

    return sourceList.map(s => s.targetMember);
}
async function fetchTargetLikes(userId: string) {
    const targetList = await prisma.like.findMany({
        where: {
            targetUserId: userId
        },
        select: {
            sourceMember: true
        }
    });

    return targetList.map(t => t.sourceMember);
}

async function fetchMutualLikes(userId: string) {
    const likedUsers = await prisma.like.findMany({
        where: {
            sourceUserId: userId
        },
        select: {
            targetUserId: true
        }
    });
    const likedIds = likedUsers.map(l => l.targetUserId);

    const mutualList = await prisma.like.findMany({
        where: {
            AND: [
                {
                    targetUserId: userId
                },
                {
                    sourceUserId: { in: likedIds }
                }
            ]
        },
        select: {
            sourceMember: true
        }
    });

    return mutualList.map(m => m.sourceMember);
}
