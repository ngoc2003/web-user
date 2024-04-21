export type SEX_TYPE = "male" | "female";

interface CommonType {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CustomUserType extends UserType {
  email: string;
}

export interface AccountType extends CommonType {
  email: string;
  password: string;
  role: number;
}

// User
export interface UserType extends CommonType {
  sex: SEX_TYPE;
  name: string;
  address: string;
  account_id: number;
  birthday: Date;
}

export interface ExtendedUserType extends UserType {
  followers: FollowerType[];
  following: FollowingType[];
  posts: ExtendedPostType[];
  pets: ExtendedPetType[];
}

// Post
export interface PostType extends CommonType {
  user_id: number;
  content: string;
  latitude?: number;
  longitude?: number;
}

export interface ExtendedPostType extends PostType {
  user: ExtendedUserType;
  comments: ExtendedCommentType[];
  likes: LikePostType[];
  images: ImageType[];
}

// Follow

export interface FollowType extends CommonType {
  user_id: number;
  following_user_id: number;
}
export interface FollowerType extends FollowType {
  user: UserType;
}
export interface FollowingType extends FollowType {
  following: UserType;
}

// Comment

export interface CommentType extends CommonType {
  post_id: number;
  user_id: number;
  content: string;
}

export interface ExtendedCommentType extends CommentType {
  user: UserType;
  likes: LikeCommentType[];
}

// Like Comment

export interface LikeCommentType extends CommonType {
  user_id: number;
  comment_id: number;
}

// Like Post

export interface LikePostType extends CommonType {
  user_id: number;
  post_id: number;
}

// Pet Type
export interface PetTypeType extends CommentType {
  image: string;
  name: string;
  type: string;
}

// Pet
export interface PetType extends CommonType {
  birthday: Date;
  description: string;
  image: string;
  name: string;
  sex: SEX_TYPE;
  user_id: number;
  pet_type_id: number;
}

export interface ExtendedPetType extends PetType {
  pet_type: PetTypeType;
  med: CommonType & {
    pet_id: number;
    favoriteFood: string;
    isFriendlyWithDog: boolean;
    isFriendlyWithCat: boolean;
    isCleanProperly: boolean;
    isHyperactive: boolean;
    isFriendlyWithKid: boolean;
    isShy: boolean;
    allergies: AllergyType[];
    weights: WeightHistoryType[];
    deworms: DewormHistoryType[];
    vaccinations: VaccinationType[];
  };
}

export interface AllergyType extends CommonType {
  description: string;
  medical_record_id: number;
}
export interface DewormHistoryType extends CommonType {
  description: string;
  medical_record_id: number;
  time: Date;
}
export interface VaccinationType extends CommonType {
  description: string;
  medical_record_id: number;
  time: Date;
  name: string;
}
export interface WeightHistoryType extends CommonType {
  description: string;
  medical_record_id: number;
  time: Date;
  weight: number;
}

export interface ImageType extends CommonType {
  link: string;
  post_id: number;
}
