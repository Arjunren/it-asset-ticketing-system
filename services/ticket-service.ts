import { HttpError } from "@/lib/http";
import type { TicketInput,TicketRepository } from "@/types/domain";
export async function createTicket(repository:TicketRepository,input:TicketInput,reporterId:string){if(input.assetId&&!(await repository.assetExists(input.assetId)))throw new HttpError(404,"Asset not found or retired");const number=await repository.nextNumber();return repository.create({...input,number,reporterId})}
export function responseTarget(priority:TicketInput["priority"]){return({CRITICAL:15,HIGH:60,MEDIUM:240,LOW:480} as const)[priority]}
