export interface Link {
    platform: string;
    link: string|null;
  }
  
export interface UserData {
  name:string;
  email:string;
}

export interface UserData {
  avatar_url: string;
  created_at: string;
  email: string;
  links: Link[];
  name: string;
  user_id: string;
}