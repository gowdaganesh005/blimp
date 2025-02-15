'use server'
import prisma from "./db";

export async function searchUsers(query: string, limit: number = 10) {
    const normalizedQuery = query.trim().toLowerCase();
    console.log("Search query:", normalizedQuery);

    try {
        const users:any = await prisma.$queryRaw`
        SELECT 
            "userId",
            "username",
            "fullName",
            "profilePhoto",
            similarity(
                lower("fullName" || ' ' || "username"),
                ${normalizedQuery}
            ) AS similarity_score
        FROM "User"
        WHERE 
            similarity(
                lower("fullName" || ' ' || "username"),
                ${normalizedQuery}
            ) > 0.1
        ORDER BY 
            similarity_score DESC
        LIMIT ${limit}
        `;

        console.log("Raw search results:", users);
        
        if (!users || users.length === 0) {
            console.log("No users found");
            return [];
        }

        return users;
    } catch (error) {
        console.error("Search error:", error);
        throw error; // Re-throw to handle in the calling function
    }
}

export async function setupQueryCapabilites() {
    try {
        // First create extensions
        await prisma.$executeRaw`
            CREATE EXTENSION IF NOT EXISTS pg_trgm;
        `;

        // Create index
        await prisma.$executeRaw`
            CREATE INDEX IF NOT EXISTS idx_users_search ON "User" 
            USING GIN ((
                to_tsvector('english',
                    coalesce("fullName", '') || ' ' ||
                    coalesce("username", '')
                ))
            );
        `;

        console.log("Search capabilities setup complete");
    } catch (error) {
        console.error("Setup error:", error);
        throw error;
    }
}

// Test function to verify data exists
