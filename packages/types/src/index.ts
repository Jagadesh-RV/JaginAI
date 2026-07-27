export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export * from './schemas/common.schema';
export * from './schemas/document.schema';
