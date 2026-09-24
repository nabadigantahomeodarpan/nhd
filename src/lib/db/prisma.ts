import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  const connectionString = `${process.env.DATABASE_URL}`;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobalNew: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobalNew ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobalNew = prisma;
