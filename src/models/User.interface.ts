export enum UserTypes {
  ADMIN = "admin",
  PUBLIC = "public",
}

export interface UserDetail {
  id: number;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  dateJoined?: string;
  lastLogin?: string;
  isActive?: true;
  isSuperuser?: true;
  profile: {
    id: number;
    profilePicture: null | string;
    profilePictureThumbnail: string;
    designation: null | string;
    organization: null | string;
    address: null | string;
    role: string;
  };
}
