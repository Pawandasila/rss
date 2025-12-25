export interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  bio?: string;
  joined_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamFormData {
  name: string;
  position: string;
  photo?: File | string; // File for upload, string for existing
  bio?: string;
  joined_at?: string; // YYYY-MM-DD
}

export interface TeamData {
  members: TeamMember[];
}
