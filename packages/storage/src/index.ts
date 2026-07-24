import * as fs from 'fs/promises';
import * as path from 'path';

export interface StorageProvider {
  upload(key: string, buffer: Buffer, _mimeType: string): Promise<string>;
  download(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  getUrl(key: string): Promise<string>;
}

export class LocalStorageProvider implements StorageProvider {
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async init() {
    try {
      await fs.mkdir(this.basePath, { recursive: true });
    } catch (e) {
      // Ignore if exists
    }
  }

  async upload(key: string, buffer: Buffer, _mimeType: string): Promise<string> {
    const fullPath = path.join(this.basePath, key);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, buffer);
    return key;
  }

  async download(key: string): Promise<Buffer> {
    const fullPath = path.join(this.basePath, key);
    return fs.readFile(fullPath);
  }

  async delete(key: string): Promise<void> {
    const fullPath = path.join(this.basePath, key);
    await fs.unlink(fullPath);
  }

  async getUrl(key: string): Promise<string> {
    // For local storage, we might just return the relative path
    return `/uploads/${key}`;
  }
}

// Default export an instance using local uploads folder
export const storage = new LocalStorageProvider(path.resolve(process.cwd(), 'uploads'));
storage.init().catch(console.error);
