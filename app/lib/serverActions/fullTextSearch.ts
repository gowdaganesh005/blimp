'use server'
import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";


export async  function fullTextSearch(searchQuery:string){
    
    
const query:any = Prisma.sql`SELECT * FROM "User" WHERE to_tsvector('english',"User"."username" ) @@ to_tsquery('english',${`%${searchQuery}%:*`});` 
    const result = await prisma.$queryRaw(query )
    console.log("Result:" ,result)
}