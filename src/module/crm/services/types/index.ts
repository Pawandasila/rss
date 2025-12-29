export interface Service {
  id: number;
  title: string;
  content: string; // Used in lists, or fallback
  image: string;
  icon?: string;
  created_at: string;
  images?: ServiceImage[];
  service_content?: ServiceContent; // Renamed to avoid confusion with content string
}

export interface ServiceImage {
  id: number;
  service: number;
  image: string;
}

export interface ServiceContent {
  id: number;
  service: number;
  content: string;
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
