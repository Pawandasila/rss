export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  category: "founders" | "state-team";
  state?: string;
  bio?: string;
  isVip?: boolean;
}

export interface TeamData {
  members: TeamMember[];
}
