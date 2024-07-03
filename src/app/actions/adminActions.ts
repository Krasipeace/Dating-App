"use server";

import { prisma } from "@/lib/prisma";
import { getUserRole } from "./authActions";

export async function getNonApprovedPhotos() {
    try {
        const role = await getUserRole();
        if (role !== "ADMIN") throw new Error("Forbidden");

        return prisma.photo.findMany({
            where: {
                isApproved: false
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getReportedMessages() {
    try {
        const role = await getUserRole();
        if (role !== "ADMIN") throw new Error("Forbidden");

        return prisma.message.findMany({
            where: {
                isAbuse: true
            }
        })
    } catch (error) {
        console.log(error);
        throw error;
    }
}