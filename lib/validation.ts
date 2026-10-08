import { z } from "zod";
export const loginSchema=z.object({email:z.email().max(254).transform(v=>v.toLowerCase()),password:z.string().min(12).max(128)});
export const createTicketSchema=z.object({title:z.string().trim().min(5).max(140),description:z.string().trim().min(12).max(5000),priority:z.enum(["LOW","MEDIUM","HIGH","CRITICAL"]),assetId:z.string().min(10).max(64).optional()});
