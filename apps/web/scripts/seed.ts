import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  datasourceUrl: 'file:../../packages/database/dev.db'
});

async function main() {
  console.log('Seeding database...');
  
  // 1. Create Organization
  const org = await prisma.organization.create({
    data: { name: 'Jagin AI HQ' }
  });
  console.log(`Created Organization: ${org.id}`);

  // 2. Create Workspace
  const workspace = await prisma.workspace.create({
    data: { name: 'Primary Workspace', organizationId: org.id }
  });
  console.log(`Created Workspace: ${workspace.id}`);

  // 3. Create Admin User
  const hashedPassword = await bcrypt.hash('admin', 10);
  const user = await prisma.user.create({
    data: {
      email: 'admin@jagin.ai',
      password: hashedPassword,
      name: 'Admin User',
      organizationId: org.id
    }
  });
  console.log(`Created Admin User: ${user.id} (${user.email})`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
