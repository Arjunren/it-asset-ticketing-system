import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
const globalDb=globalThis as unknown as {serviceDesk?:PrismaClient};
function createClient(){const connectionString=process.env.DATABASE_URL??"postgresql://invalid:invalid@127.0.0.1:5432/invalid";return new PrismaClient({adapter:new PrismaPg({connectionString})})}
export const db=globalDb.serviceDesk??createClient();if(process.env.NODE_ENV!=="production")globalDb.serviceDesk=db;
