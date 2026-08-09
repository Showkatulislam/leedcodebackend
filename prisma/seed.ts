import { prisma } from "../src/shared/db/prisma.service.js";
async function main() {
    console.log("Seeding database...");
    //Role
    await prisma.role.createMany(
        {
            data: [
                {
                    name: "ADMIN"
                },
                {
                    name: "USER"
                },
                { name: "MODERATOR" }
            ],
            skipDuplicates: true
        }
    )

    await prisma.language.createMany({
        data: [
            {
                name: "Javascript",
                version: "ES2024"
            },
            {
                name: "JavaScript",
                version: "5.0"
            },
            {
                name: "Python",
                version: "3.10"
            },
            {
                name: "Java",
                version: "20"
            },
            {
                name: "C++",
                version: "20"
            }, {
                name: "C#",
                version: "12"
            },
            {
                name: "Go",
                version: "1.21"
            }
        ],
        skipDuplicates: true
    })

    //Tags

    await prisma.tag.createMany({
        data: [
            { name: "Array" },
            { name: "String" },
            { name: "Hash Table" },
            { name: "Linked List" },
            { name: "Dynamic Programming" },
            { name: "Stack" },
            { name: "Queue" },
            { name: "Tree" },
            { name: "Graph" },
            { name: "Recursion" },
            { name: "Sorting" },
            { name: "Searching" },
            { name: "Greedy" },
            { name: "Backtracking" },
            { name: "Divide and Conquer" },
            { name: "Bit Manipulation" },
            { name: "Math" },
            { name: "Geometry" },
            { name: "Probability" },
            { name: "Dynamic Programming" },
            { name: "Sliding Window" },
            { name: "Two Pointers" },
        ],
        skipDuplicates: true
    })

    console.log("Seeding completed.");

}
main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});