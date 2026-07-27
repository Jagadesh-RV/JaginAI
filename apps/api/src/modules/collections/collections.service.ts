import { prisma } from '@jagin/database';

export class CollectionsService {
  async getAllCollections() {
    return prisma.collection.findMany();
  }
}

export const collectionsService = new CollectionsService();
