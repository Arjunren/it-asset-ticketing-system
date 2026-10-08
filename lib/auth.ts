import "server-only";
import { createHash,randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { Role } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { HttpError } from "@/lib/http";
const COOKIE="service_session";const hash=(v:string)=>createHash("sha256").update(v).digest("hex");
export async function createSession(userId:string){const token=randomBytes(32).toString("base64url");const expiresAt=new Date(Date.now()+Number(process.env.SESSION_TTL_HOURS??12)*3600000);await db.session.create({data:{tokenHash:hash(token),userId,expiresAt}});(await cookies()).set(COOKIE,token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",expires:expiresAt})}
export async function requireUser(roles?:Role[]){const token=(await cookies()).get(COOKIE)?.value;if(!token)throw new HttpError(401,"Authentication required");const session=await db.session.findUnique({where:{tokenHash:hash(token)},include:{user:true}});if(!session||session.expiresAt<=new Date()||!session.user.active)throw new HttpError(401,"Session is invalid or expired");if(roles&&!roles.includes(session.user.role))throw new HttpError(403,"Insufficient permission");return session.user}
export async function destroySession(){const store=await cookies();const token=store.get(COOKIE)?.value;if(token)await db.session.deleteMany({where:{tokenHash:hash(token)}});store.delete(COOKIE)}
