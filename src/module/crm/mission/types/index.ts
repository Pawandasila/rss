export interface Mission {
  id: number;
  title: string;
  description: string;
  image: string;
  headline?: string;
  icon?: string;
  category?: string;
  created_at: string;
}

export interface CreateMissionPayload {
  title: string;
  description: string;
  image: File | null;
  headline?: string;
  icon?: File | null;
  category?: string;
}

export interface UpdateMissionPayload extends Partial<CreateMissionPayload> {
  id: number;
}
