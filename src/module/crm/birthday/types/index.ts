export interface BirthdayUser {
  id: number;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  image: string | null;
  gender: string | null;
  profession: string | null;
  is_verified: boolean;
  is_member_account: boolean;
  is_volunteer: boolean;
  is_business_account: boolean;
  date_joined: string;
  state: string | null;
  district: string | null;
  address: string | null;
}

export interface BirthdayApiResponse {
  results?: BirthdayUser[];
  count?: number;
}
