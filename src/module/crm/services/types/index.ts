export interface Service {
  id: number;
  title: string;
  content: string;
  image: string;
  icon?: string;
  created_at: string;
}

export interface CreateServicePayload {
  title: string;
  content: string;
  image?: File | null;
  icon?: File | null;
}

export interface UpdateServicePayload extends Partial<CreateServicePayload> {
  id: number;
}
