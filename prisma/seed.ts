import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function createIfNotExists({
  modelName,
  uniqueAttributeToCheck,
  data,
}: {
  modelName: string
  uniqueAttributeToCheck: string
  data: Array<Record<string, any>>
}): Promise<Array<Record<string, any>>> {
  if (!prisma[modelName]) {
    throw new Error(`Modelo '${modelName}' não encontrado no Prisma Client.`)
  }

  for (const item of data) {
    const exists = await prisma[modelName].findFirst({
      where: {
        [uniqueAttributeToCheck]: item[uniqueAttributeToCheck],
      },
    })

    if (!exists) {
      await prisma[modelName].create({ data: item })
      console.log(`Criado: ${JSON.stringify(item)}`)
    } else {
      console.log(`Já existe: ${item[uniqueAttributeToCheck]}`)
    }
  }

  return await prisma[modelName].findMany()
}
async function main() {
  await createIfNotExists({
    modelName: 'account',
    uniqueAttributeToCheck: 'email',
    data: [
      {
        name: faker.person.fullName(),
        email: 'academyativo@fr.com',
        password: await hash('devdevdev', 8),
      },
    ],
  })

  console.log('Seeded data')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
