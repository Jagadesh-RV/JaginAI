import { z } from 'zod';

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  workspaceId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const DocumentVersionSchema = z.object({
  id: z.string().uuid(),
  documentId: z.string().uuid(),
  versionNumber: z.number().int().positive(),
  uploadUserId: z.string().uuid(),
  originalFilename: z.string(),
  mimeType: z.string(),
  fileSize: z.number().int().nonnegative(),
  storageKey: z.string(),
  createdAt: z.date(),
});

export type DocumentDTO = z.infer<typeof DocumentSchema>;
export type DocumentVersionDTO = z.infer<typeof DocumentVersionSchema>;
