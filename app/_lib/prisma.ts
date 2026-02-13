import { PrismaClient } from '@prisma/client' 
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// 1. Função que define como o Prisma é instanciado no Prisma 7
const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaPg(pool)
  
  return new PrismaClient({ adapter })
}

// 2. Prepara o objeto global para o TypeScript
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// 3. Cria a instância única (Singleton)
const db = globalThis.prismaGlobal ?? prismaClientSingleton()

// 4. Exporta com o nome que você solicitou
export { db }

// 5. Garante que no desenvolvimento a instância seja reaproveitada
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = db
}
