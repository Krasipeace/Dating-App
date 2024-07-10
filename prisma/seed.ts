import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function seedMembers() {
    return membersData.map(async member => prisma.user.create({
        data: {
            email: member.email,
            emailVerified: new Date(),
            name: member.name,
            passwordHash: await hash("password", 10),
            image: member.image,
            profileComplete: true,
            member: {
                create: {
                    birthDate: new Date(member.dateOfBirth),
                    gender: member.gender,
                    name: member.name,
                    created: new Date(member.created),
                    updated: new Date(member.lastActive),
                    description: member.description,
                    country: member.country,
                    city: member.city,
                    image: member.image,
                    photos: {
                        create: {
                            url: member.image,
                            isApproved: true,
                        }
                    }
                }
            }
        }
    }))
}

async function seedAdmin() {
    return prisma.user.create({
        data: {
            email: process.env.ADMIN_EMAIL,
            emailVerified: new Date(),
            name: "Administrator",
            passwordHash: await hash(process.env.ADMIN_PASSWORD as string, 10),
            role: "ADMIN",
        }
    })
}

async function main() {
    if (process.env.RUN_SEED === "true" || process.env.NODE_ENV === "development") {
        await seedMembers();
        await seedAdmin();
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})