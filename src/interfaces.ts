export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface ReviewData {
  review: string;
}

export interface Post {
  post_id: number;
  post_company: string;
  post_review: string;
  post_owner_id: number;
  post_created_at: string;
  post_no_of_likes: number;
  post_liked_by_current_user: boolean;
}
