import { randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
const scrypt = promisify(nodeScrypt);
export async function hashPassword(password:string){const salt=randomBytes(16).toString("hex");const digest=(await scrypt(password,salt,64)) as Buffer;return `scrypt:${salt}:${digest.toString("hex")}`}
export async function verifyPassword(password:string,stored:string){const [algorithm,salt,digest]=stored.split(":");if(algorithm!=="scrypt"||!salt||!digest)return false;const expected=Buffer.from(digest,"hex");const actual=(await scrypt(password,salt,expected.length)) as Buffer;return actual.length===expected.length&&timingSafeEqual(actual,expected)}
