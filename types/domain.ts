export type TicketInput={title:string;description:string;priority:"LOW"|"MEDIUM"|"HIGH"|"CRITICAL";assetId?:string};
export interface TicketRepository{nextNumber():Promise<string>;assetExists(id:string):Promise<boolean>;create(input:TicketInput&{number:string;reporterId:string}):Promise<{id:string;number:string}>}
