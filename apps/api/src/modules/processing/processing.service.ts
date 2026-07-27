import { prisma } from '@jagin/database';

export class ProcessingService {
  async getAllJobs() {
    return prisma.processingJob.findMany({ include: { documentVersion: true } });
  }
}

export const processingService = new ProcessingService();
